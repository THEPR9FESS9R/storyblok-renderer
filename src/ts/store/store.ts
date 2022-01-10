/**
 * @module
 * @internal
 */

import { ActionTree, createStore as createNewStore, GetterTree, MutationTree, Store } from 'vuex'
import { SharedServiceData, GlobalLinks } from '../../interfaces/pageStructure'
import { Ads } from '../advertisement/ads.types'
import { DebugAdsAuction } from '../advertisement/debug/adsDebugging.types'
import { NavigationTimingConfiguration } from '../navigationTiming/navigationTiming.types'

import {
    StoreModuleDefinition,
    GlobalState,
    GlobalStateActions,
    GlobalStateGetters,
    MsHydrationComponents,
    MsTrackings,
    RequestContext,
} from './store.interface'

const mutations: MutationTree<GlobalState> = {
    [GlobalStateActions.SAVE_HYDRATION_COMPONENT]: (state, msComponent: MsHydrationComponents) => {
        Object.assign(state.components, msComponent)
    },
    [GlobalStateActions.SET_OVERLAY_STATE]: (state, isOverlayOpen: boolean) => {
        state.isOverlayOpen = isOverlayOpen
    },
    [GlobalStateActions.SAVE_TRACKING]: (state, tracking: MsTrackings) => {
        Object.assign(state.trackings, tracking)
    },
    [GlobalStateActions.SAVE_ADS]: (state, ads: Ads) => {
        Object.assign(state.ads, ads)
    },
    [GlobalStateActions.SAVE_REQUEST_CONTEXT]: (state, requestContext: RequestContext) => {
        state.requestContext = requestContext
    },
    [GlobalStateActions.SAVE_DEBUG_ADS_AUCTION]: (state, auction: DebugAdsAuction) => {
        state.debugAds.push(auction)
    },
    [GlobalStateActions.SAVE_NAVIGATION_TIMING_CONFIG]: (state, config: NavigationTimingConfiguration) => {
        state.navigationTiming = config
    },
    [GlobalStateActions.SAVE_SHARED_SERVICE_DATA]: (state, data: SharedServiceData) => {
        state.sharedServiceData = data
    },
}

const actions: ActionTree<GlobalState, any> = {
    [GlobalStateActions.SET_OVERLAY_STATE]: ({ commit }, isOverlayOpen: boolean) => {
        commit(GlobalStateActions.SET_OVERLAY_STATE, isOverlayOpen)
    },
    [GlobalStateActions.SAVE_HYDRATION_COMPONENT]: ({ commit }, component: MsHydrationComponents) => {
        commit(GlobalStateActions.SAVE_HYDRATION_COMPONENT, component)
    },
    [GlobalStateActions.SAVE_TRACKING]: ({ commit }, tracking: MsTrackings) => {
        commit(GlobalStateActions.SAVE_TRACKING, tracking)
    },
    [GlobalStateActions.SAVE_ADS]: ({ commit }, ads: Ads) => {
        commit(GlobalStateActions.SAVE_ADS, ads)
    },
    [GlobalStateActions.SAVE_REQUEST_CONTEXT]: ({ commit }, requestContext: RequestContext) => {
        commit(GlobalStateActions.SAVE_REQUEST_CONTEXT, requestContext)
    },
    [GlobalStateActions.SAVE_DEBUG_ADS_AUCTION]: ({ commit }, requestContext: RequestContext) => {
        commit(GlobalStateActions.SAVE_DEBUG_ADS_AUCTION, requestContext)
    },
    [GlobalStateActions.SAVE_NAVIGATION_TIMING_CONFIG]: ({ commit }, config: NavigationTimingConfiguration) => {
        commit(GlobalStateActions.SAVE_NAVIGATION_TIMING_CONFIG, config)
    },
    [GlobalStateActions.SAVE_SHARED_SERVICE_DATA]: ({ commit }, data: SharedServiceData) => {
        commit(GlobalStateActions.SAVE_SHARED_SERVICE_DATA, data)
    },
}

const getters: GetterTree<GlobalState, GlobalState> = {
    [GlobalStateGetters.REQUEST_CONTEXT]: (state: GlobalState): RequestContext => {
        return state.requestContext
    },
    [GlobalStateGetters.DEBUG_ADS_AUCTIONS]: (state: GlobalState): DebugAdsAuction[] => {
        return state.debugAds
    },
    [GlobalStateGetters.ADS]: (state: GlobalState): Ads => {
        return state.ads
    },
    [GlobalStateGetters.REGISTERED_COMPONENTS]: (state: GlobalState): string[] => {
        return state.registeredComponents
    },
    [GlobalStateGetters.NAVIGATION_TIMING_CONFIG]: (state: GlobalState): NavigationTimingConfiguration => {
        return state.navigationTiming
    },
    [GlobalStateGetters.GLOBAL_LINKS]: (state: GlobalState): GlobalLinks => {
        return state.requestContext.globalLinks
    },
    [GlobalStateGetters.SHARED_SERVICE_DATA]: (state: GlobalState): SharedServiceData => {
        return state.sharedServiceData
    },
}

export function createStore(registeredComponents?: string[], modules?: StoreModuleDefinition[]) {
    const state: GlobalState = {
        isOverlayOpen: false,
        components: {} as MsHydrationComponents,
        trackings: {} as MsTrackings,
        requestContext: {} as RequestContext,
        ads: {} as Ads,
        debugAds: [],
        registeredComponents: registeredComponents || [],
        navigationTiming: {
            url: '',
            // Navigation timing is disabled per default unless it's correctly configured to avoid too excessive tracking.
            frequency: 0.0,
        },
        sharedServiceData: {},
    }

    const store = createNewStore({ state, mutations, actions, getters, strict: true })

    registerModules(modules, store)

    return store
}

function registerModules(modules: StoreModuleDefinition[], store: Store<GlobalState>) {
    if (modules) {
        modules.forEach(({ path, module, options }) => store.registerModule(path, module, options))
    }
}
