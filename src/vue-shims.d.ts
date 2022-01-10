import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { GlobalState } from './ts/store/store.interface'

declare module '@vue/runtime-core' {
    // Declare your own store states.

    interface ComponentCustomProperties {
        $store: Store<GlobalState>
    }
}
