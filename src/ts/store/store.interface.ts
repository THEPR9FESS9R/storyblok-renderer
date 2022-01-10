/**
 * @module store
 */

import { Module, ModuleOptions } from 'vuex'
import { Device, GlobalLinks, Header, SharedServiceData } from '../../interfaces/pageStructure'
import { Ads } from '../advertisement/ads.types'
import { DebugAdsAuction } from '../advertisement/debug/adsDebugging.types'
import { DebugContext } from '../debug/debugContext.interfaces'
import { NavigationTimingConfiguration } from '../navigationTiming/navigationTiming.types'

export enum GlobalStateActions {
    SET_OVERLAY_STATE = 'setOverlayState',
    SAVE_HYDRATION_COMPONENT = 'saveHydrationComponent',
    SAVE_TRACKING = 'saveTracking',
    SAVE_ADS = 'saveAds',
    SAVE_REQUEST_CONTEXT = 'saveRequestContext',
    SAVE_DEBUG_ADS_AUCTION = 'saveDebugAdsAuction',
    SAVE_NAVIGATION_TIMING_CONFIG = 'saveNavigationTimingConfig',
    SAVE_SHARED_SERVICE_DATA = 'saveSharedServiceData',
}

export enum GlobalStateGetters {
    REQUEST_CONTEXT = 'requestContext',
    DEBUG_ADS_AUCTIONS = 'debugAdsAuctions',
    ADS = 'ads',
    REGISTERED_COMPONENTS = 'registeredComponents',
    NAVIGATION_TIMING_CONFIG = 'navigationTimingConfig',
    GLOBAL_LINKS = 'globalLinks',
    SHARED_SERVICE_DATA = 'sharedServiceData',
}

export interface MsHydrationComponents {
    [key: string]: MsHydrationComponent
}

export interface MsTrackings {
    [key: string]: MsTracking
}
export interface MsTracking {
    [key: string]: Object | String | Number
}
export interface MsHydrationComponent {
    props: Record<string, any>
    staticClass: string
}
export interface GlobalState {
    isOverlayOpen: boolean
    components: MsHydrationComponents
    trackings: MsTrackings
    requestContext: RequestContext
    ads: Ads
    debugAds: DebugAdsAuction[]
    registeredComponents: string[]
    navigationTiming: NavigationTimingConfiguration
    sharedServiceData: SharedServiceData
}

export interface MsComponent {
    [key: string]: Header
}

export interface RequestContext {
    device: Device
    location: Location
    globalLinks: GlobalLinks
    url: URL
    pageId: string
    nodeId: string
    federalState: string
    xitiPageLevel2: string
    debugContext: DebugContext
}

export interface QueryParams {
    [key: string]: string | string[]
}

export interface StoreModuleDefinition<T = any> {
    path: string
    module: Module<T, GlobalState>
    options?: ModuleOptions
}
