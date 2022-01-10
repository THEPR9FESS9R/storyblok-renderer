import { getCurrentInstance, onServerPrefetch } from 'vue'
import { GlobalStateActions } from './store/store.interface'
let uuid = 0

export function registerForHydration(data?: Record<string | number | symbol, any>) {
    onServerPrefetch(() => {
        console.log('onServerPrefetch')
        const currentInstance = getCurrentInstance().proxy
        const componentName = currentInstance.$options.name
        const uuid = createUUID(componentName)

        const dataToSave = {}

        if (currentInstance.$props) {
            Object.assign(dataToSave, currentInstance.$props)
        }

        if (data) {
            Object.assign(dataToSave, data)
        }

        // currentInstance.$attrs['data-hydration'] = componentName
        // currentInstance.$attrs['data-cms-id'] = uuid
        currentInstance.$store.dispatch(GlobalStateActions.SAVE_HYDRATION_COMPONENT, {
            [uuid]: {
                props: convertToPlainJson(dataToSave),
            },
        })
    })
}

function createUUID(prefix: string = ''): string {
    return `${prefix}${uuid++}`
}

function convertToPlainJson(proxy: any) {
    if (!proxy) {
        return {}
    }

    return JSON.parse(JSON.stringify(proxy))
}
