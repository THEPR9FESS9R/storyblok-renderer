/*
    This type definition is not complete as it's written manually (no official/inofficial types are available by now).
    The manual is here: https://docs.prebid.org/dev-docs/publisher-api-reference.html
    Just add any missing definitions as needed.
*/

export interface PrebidJS {
    que: Queue
    processQueue: () => void
    setConfig: (config: Config) => void

    addAdUnits: (adUnits: PrebidAdUnit[]) => void
    removeAdUnit: (removeAdUnit: string) => void

    requestBids: (bidCallbacks: BidCallbacks) => void
    setTargetingForGPTAsync: () => void
    getHighestCpmBids: () => PrebidBidResponse[]
    bidderSettings: any
}

export interface Queue {
    push(x: () => void): void
}

export interface Config {
    priceGranularity: string
    consentManagement: ConsentManagement
    sizeConfig: SizeConfig[]
    currency: CurrencyConfig
    enableSendAllBids: boolean
    userSync: any
}
export interface GdprConfig {
    cmpApi: string
    timeout: number
    defaultGdprScope: boolean
}
export interface ConsentManagement {
    gdpr: GdprConfig
}
export interface SizeConfig {
    mediaQuery: string
    sizesSupported: number[][]
    labels: string[]
}
export interface CurrencyConfig {
    adServerCurrency: string
    bidderCurrencyDefault: BidderCurrencyDefault
    conversionRateFile: string
    defaultRates: any
    granularityMultiplier: number
}
export interface BidderCurrencyDefault {
    [bidder: string]: string
}

export interface PrebidAdUnit {
    code: string
    sizes?: number[][]
    id: string
    mediaTypes?: MediaTypes
    bids: AdUnitBidder[]
}
export interface MediaTypes {
    banner?: AdUnitSizes
    video?: VideoMediaType
}
export interface AdUnitBidder {
    bidder: string
    labelAny?: string[]
    params: any
}

export interface AdUnitSizes {
    pos?: number
    sizes: number[][]
}

export interface VideoMediaType {
    context: string
    playerSize: number[]
    pos?: number
}
export interface BidCallbacks {
    timeout: number
    bidsBackHandler?: (result: PrebidBidResponses) => void
    adUnitCodes?: string[]
}

export interface PrebidBidResponses {
    [key: string]: PrebidBidResponseWrapper
}
export interface PrebidBidResponseWrapper {
    bids?: PrebidBidResponse[]
}
export interface PrebidBidResponse {
    bidderCode: string
    width: number
    height: number
    statusMessage: string
    adId: string
    requestId: string
    mediaType: string
    source: string
    cpm: number
    currency: string
    netRevenue: boolean
    ttl: number
    creativeId: string | number
    dealId?: string | null
    ad: string
    originalCpm: number
    originalCurrency: string
    meta: any
    auctionId: string
    responseTimestamp: number
    requestTimestamp: number
    bidder: string
    adUnitCode: string
    timeToRespond: number
    adserverTargeting: any
}
