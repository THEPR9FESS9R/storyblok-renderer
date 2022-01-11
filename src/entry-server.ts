import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createStore } from './ts/store/store'
import { PageStructure } from './interfaces/pageStructure'
import DefaultView from './components/DefaultView/DefaultView.vue'
import MsMissingElement from './components/MsMissingElement/MsMissingElement'

export async function render(pageStructure: PageStructure) {
    console.log('pageStructure:', pageStructure)
    const app = createSSRApp({
        components: {
            DefaultView,
        },
        data() {
            return {
                pageStructure,
            }
        },
        template: `<default-view :pageStructure="pageStructure" />`,
    })

    const globalElements = await addGlobalComponents(app)
    app.component('MsMissingElement', MsMissingElement)

    const store = createStore(globalElements)

    app.use(store)

    return renderToString(app).then((html) => {
        return html
    })
}

async function addGlobalComponents(app: ReturnType<typeof createSSRApp>) {
    const modules = import.meta.glob('../src/cmsElements/**/*.vue')
    const componentPaths = Object.keys(modules)

    const loadedModules = await Promise.all(componentPaths.map((modulePath) => modules[modulePath]()))

    const names = componentPaths.map((modulePath, index) => {
        const name = modulePath.replace(/.+\//, '').replace('.vue', '')

        app.component(name, loadedModules[index].default)

        return name
    })

    return names
}
