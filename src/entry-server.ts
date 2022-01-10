import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import mockPS from './mockPS'
import MsMissingElement from './components/MsMissingElement/MsMissingElement.vue'
import * as css from './css/index.css'
import { createStore } from './ts/store/store'

export async function render() {
    const app = createSSRApp({
        components: {
            MsMissingElement,
        },
        data() {
            return {
                mockPS,
            }
        },
        template: `<ms-missing-element :cmsContent="mockPS.page" />`,
    })

    const globalElements = await addGlobalComponents(app)
    app.component('MsMissingElement', MsMissingElement)

    const store = createStore(globalElements)

    app.use(store)

    return renderToString(app).then((html) => {
        // return html + `<style>${css.default}</style>`
        return html
    })
}

async function addGlobalComponents(app: ReturnType<typeof createSSRApp>) {
    const modules = import.meta.glob('../src/cmsElements/**/[MES]_*.vue')
    const componentPaths = Object.keys(modules)

    const loadedModules = await Promise.all(componentPaths.map((modulePath) => modules[modulePath]()))

    const names = componentPaths.map((modulePath, index) => {
        const name = modulePath.replace(/.+\//, '').replace('.vue', '')

        app.component(name, loadedModules[index].default)

        return name
    })

    return names
}
