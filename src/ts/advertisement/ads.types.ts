import {
    DfpTargeting,
    AdSizes,
    NativeStringMap,
    NativeWidths,
    SizeMappings,
    CustomSearchAdSettings,
} from '../../interfaces/pageStructure'

export interface Ads {
    networkCode: number
    targeting: DfpTargeting
    adUnits: AdUnit[]
    sizes: AdSizes
    pageName: string
    prebidSettings: PrebidSettings
    lazyLoadSettings: LazyLoadSettings
    stickyTimeout: number
    prebidTimeout: number
    nativeSettings: NativeSettings
    smartReloadSettings: SmartReloadSettings
    customSearchAds: CustomSearchAds | null
}

export interface NativeSettings {
    nativeHeights: NativeStringMap
    nativeWidths: NativeWidths
    nativeWidthTypes: NativeStringMap
}

export interface SmartReloadSettings {
    reloadTimeoutInSec: number
    maxReloads: number
    reloadDisabledBidders: string[]
}

export interface LazyLoadSettings {
    fetchMarginPercent: number
    renderMarginPercent: number
    mobileScaling: number
    enabled: boolean
}

export interface AdUnit {
    id: string
    position: string
    sizes: string[]
    bidderSizes: string[]
    bidderVideoSizes: string[]
    bidders: Bidder[]
    device: string
    divCollapsing: boolean
    maxHeight?: number
    sticky: boolean
    outOfPage: boolean
    sizeMapping: SizeMappings
    stickyTimeout?: number
    noAuction: boolean
    placeholderMinHeight: number
    piReloadDisabled: boolean
}

export interface Bidder {
    id: string
    sizes?: string[]
    videoSizes?: string[]
    params?: BidderParams
    multiSize: boolean
}

export interface BidderParams {
    template: string
    placeholders: {
        [key: string]: string
    }
}

export interface PrebidSettings {
    sendAllBidsEnabled: boolean
    userSync: any
    bidders: {
        [bidderId: string]: PrebidBidderSettings
    }
}

export interface PrebidBidderSettings {
    defaultCurrency?: string
    bidCpmAdjustment?: number
}

export interface AdContext {
    gptSlots: googletag.Slot[]
    ads: Ads
    viewportAdUnits: AdUnit[]
}

export enum RefreshReason {
    BREAKPOINT_CHANGE,
    USER_INTERACTION,
}

export interface CustomSearchAds extends CustomSearchAdSettings {
    googleAdClient: string
    searchTerm: string
    googleAdChannel: string
    plusOnes: boolean
    sellerRatings: boolean
    styleId: string
    adUnits: CustomSearchAdUnit[]
}

export interface CustomSearchAdUnit {
    props: {
        [key: string]: string | string[] | number | boolean
    }
}
