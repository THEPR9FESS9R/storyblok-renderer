/**
 * @module
 * @internal
 */

import { createSSRApp, h } from '@vue/runtime-dom'
import { Store } from 'vuex'
import { MsHydrationComponent, GlobalState } from '../../../../sunrise/sunrise-core/src/bundler/store/store.interface'

const DATA_SELECTOR = '[data-hydration]'

async function hydrateComponents(dynamicComponents: any | null, store: Store<GlobalState>) {
    const promises: Array<Promise<any | void>> = []
    Array.from(document.querySelectorAll(DATA_SELECTOR)).forEach(async (item: HTMLElement) => {
        const cmsId = item.dataset.cmsId
        const moduleName = item.dataset.hydration
        const component = await dynamicComponents[moduleName]()

        hydrateComponent(cmsId, store, component, item)
    })

    return Promise.all(promises)
}

function createComponentInstance(cmsId: string, store: Store<GlobalState>, component: any) {
    const hydrationData = getDataFomStore(cmsId, store)
    const app = createSSRApp({
        render: () =>
            h(component.default, {
                staticClass: hydrationData.staticClass,
                props: hydrationData.props,
            }),
    })

    app.use(store)

    return app
}

function hydrateComponent(cmsId: string, store: Store<GlobalState>, component: any, item: HTMLElement): void {
    createComponentInstance(cmsId, store, component).mount(item, true)
}

function getDataFomStore(id: string, store: Store<GlobalState>): MsHydrationComponent {
    return store.state.components[id]
}

export default hydrateComponents
