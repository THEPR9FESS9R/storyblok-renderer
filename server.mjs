import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import axios from 'axios'

var privateKey = fs.readFileSync('./localhost.key', 'utf8')
var certificate = fs.readFileSync('./localhost.crt', 'utf8')
var mockPS = JSON.parse(fs.readFileSync('./fixture.json', 'utf8'))

async function createApp() {
    const app = express()

    // Create Vite server in middleware mode. This disables Vite's own HTML
    // serving logic and let the parent server take control.
    //
    // If you want to use Vite's own HTML serving logic (using Vite as
    // a development middleware), using 'html' instead.
    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' },
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)

    app.use('*', async (req, res) => {
        console.log('req.originalUrl', req.originalUrl)
        const url = req.originalUrl

        try {
            // 1. Read index.html
            let template = fs.readFileSync(path.resolve(process.cwd(), './index.html'), 'utf-8')

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react-refresh
            template = await vite.transformIndexHtml(url, template)

            // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            const { render } = await vite.ssrLoadModule('/src/entry-server.ts')

            // 4. render the app HTML. This assumes entry-server.js's exported `render`
            //    function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const pageStructure = await fetchPageStructure(url)
            const appHtml = await render(pageStructure)

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // If an error is caught, let Vite fix the stracktrace so it maps back to
            // your actual source code.
            vite.ssrFixStacktrace(e)
            console.error(e)
            res.status(500).end(e.message)
        }
    })

    return app
}

const credentials = { key: privateKey, cert: certificate }
const app = await createApp()
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(8080)
httpsServer.listen(8443)

async function fetchPageStructure(url) {
    const storyBlokUrl = `https://api.storyblok.com/v1/cdn/stories${url}?version=draft&token=${
        process.env.TOKEN
    }&cv=${Date.now()}`

    console.log('storyBlokUrl:', storyBlokUrl)
    return axios.get(storyBlokUrl).then(({ data }) => data)
}
