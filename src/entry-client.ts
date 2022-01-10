import { createSSRApp } from '@vue/runtime-dom'
import hydrateComponents from './ts/hydration'
import { createStore } from './ts/store/store'

function setup() {
    const store = createStore()

    if (window.__INITIAL_STATE__) {
        const initialState = window.__INITIAL_STATE__

        // Slight modifications on the state to have objects/symbols rather than to deal with strings every where.
        initialState.requestContext.url = new URL(initialState.requestContext.url)

        store.replaceState(initialState)
    }

    return { store }
}

function main() {
    debugger
    const { store } = setup()

    const dynamicImports = {
        S_Home: () => import('./cmsElements/S/S_Home/S_Home.vue'),
    }

    hydrateComponents(dynamicImports, store)
}

main()
