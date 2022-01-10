/**
 * @module server/pageStructure
 */
export interface PageStructure {
    header: Header
    page: CmsContent
    footer: Footer
    meta: Meta
}

export interface Meta {
    device: Device
    tealium: Tealium
    pageCanonical: string | null
    globalLinks: GlobalLinks
    location: Location
    dfpModel: DfpModel
    wildcards: string[]
    xitiPageLevel2: string
    customSearchAds?: CustomSearchAdSettings
    abTest?: AbTest
}

export interface AbTest {
    id: string
    variant: string
}

export interface Location {
    id: string
    name: string
    type: LocationType
    cityCenter?: GeoPoint
    geoCenter: GeoPoint
    kgs: string
    zip?: string
    nameShort: string
    parent?: Location
}

export interface GeoPoint {
    latitude: number
    longitude: number
}

export enum LocationType {
    NATION = 'NATION',
    BUNDESLAND = 'BUNDESLAND',
    REGION = 'REGION',
    KREIS = 'KREIS',
    STADT = 'STADT',
    GEMEINDE = 'GEMEINDE',
    STADTTEIL = 'STADTTEIL',
    UNBEKANNT = 'UNBEKANNT',
}

export interface GlobalLinks {
    [key: string]: string
}

export interface Device {
    typeString: string
    android: boolean
    ios: boolean
    desktopExclusive: boolean
    distinguishedTypeString: string
    tablet: boolean
    mobile: boolean
    desktop: boolean
}

export interface Tealium {
    cmsPageId: string | null
    userSearchGeoLat: string | null
    userSearchGeoLon: string | null
    userSearchCityName: string | null
    cityDistrict: string | null
    city: string | null
    urbanDistrict: string | null
    federalState: string | null
    region: string | null
    country: string | null
    pageName: string | null
    pageNodeId: string | null
}

export interface ListItems {
    indentLevel: number
    text: ContentTag[]
}

export interface SharedServiceData {
    [key: string]: any
}

export interface CmsContent<T = any> {
    cmsId: string
    computedProperties?: ComputedProperties
    name: string
    label: string
    properties: CmsProperties
    text?: ContentTag[]
    children?: CmsContent[]
    listItems?: ListItems[]
    binaryUrl?: string
    binaryAltText?: string
    serviceData?: T
    table?: Table
}

export interface CmsProperties {
    [settingId: string]: boolean | string | number | Array<string>
}

export interface ComputedProperties {
    [key: string]: any
}
export interface Header {
    channelLabel: string
    channelName: string
    navigationId: string
    url: string
    introduction: string
    locationName: string
    primaryAction: null
    secondaryAction: null
    navigations: Navigation[]
    mainNavigation: NavigationItem[]
    firstLayerLinks: NavigationItem[] | null
}

export interface Navigation {
    navigationId: string
    channelLabel: string
    channelSvg: string
    introduction: string
    url: null | string
    target: string
    nofollow: boolean
    items: NavigationItem[]
    primaryAction: NavigationItem | null
    secondaryAction: NavigationItem | null
    highlighted: boolean
}

export interface NavigationItem {
    text: string
    url: string
    target: string
    nofollow: boolean
    highlighted: boolean
}

export enum Target {
    Blank = '_blank',
    Self = '_self',
}

export interface Footer {
    agbLink: string
    privacyLink: string
    imprintLink: string
    pressLink: string
    faqLink: string
    properties: CmsProperties
    page: CmsContent
    breadcrumb: Breadcrumb[]
}

export interface Breadcrumb {
    title: string
    link: string
    pageLevelName: null | string
}

export interface ContentTag {
    type: string
    text?: string
    children?: ContentTag[]
    href?: string
    rel?: string
    target?: string
    sign?: string
    prgEnabled?: boolean
    id?: string
    suffix?: ContentTag[]
}

export enum TagType {
    I = 'i',
    U = 'u',
    B = 'b',
    Br = 'br',
    Link = 'link',
    Text = 'text',
    Anchor = 'anchor',
}

export interface DfpModel {
    prebidTimeout: number
    amazonTimeout: number
    networkCode: number
    amazonPublisherId: string
    adUnits: MsAdUnits
    targeting: DfpTargeting
    bidderConfigs: BidderConfigs
    sizes: AdSizes
    adUnitParams: AdUnitParams
    adUnitIdPlaceholder: string
    pagename: string
    billboardEnabled: boolean
    lazyLoadFetchMarginPercent: number
    lazyLoadRenderMarginPercent: number
    lazyLoadMobileScaling: number
    lazyLoadEnabled: boolean
    stickyTimeout: number
    nativeWidths: NativeWidths
    nativeHeights: NativeStringMap
    nativeWidthTypes: NativeStringMap
    smartReloadEnabled: boolean
    reloadTimeOutInSecMobile: number
    reloadTimeOutInSec: number
    maxReloads: number
    sendAllBidsEnabled: boolean
    userSync?: string
    reloadBlacklist: string
}

export interface MsAdUnits {
    [key: string]: MsAdUnit
}

export type SizeMappings = SizeMapping[]
export type SizeMapping = [SizeMappingBreakpoint, SizeMappingSizes]
export type SizeMappingBreakpoint = [number, number]
export type SizeMappingSizes = SizeMappingSize[]
export type SizeMappingSize = [number, number]

export interface MsAdUnit {
    id: string
    position: string
    sizes: string
    sizeMapping: SizeMappings
    device: string
    divCollapsing: boolean
    bidderBannerSizes: BidderBannerSizes
    bidderVideoSize?: BidderBannerSizes
    maxHeight: number
    sticky: boolean
    outOfPage: boolean
    defaultActive: boolean
    stickyTimeout?: number
    noAuction: boolean
}

export interface BidderBannerSizes {
    [key: string]: string
}

export interface DfpTargeting {
    [key: string]: string
}

export interface BidderConfigs {
    [key: string]: BidderConfig
}

export interface BidderConfig {
    params: string
    multiSize: boolean
    bidCpmAdjustment: number
    currency: string
    smartReloadDisabled: boolean
}

export interface AdSizes {
    [key: string]: AdSize
}

export interface AdSize {
    id: string
    w: number
    h: number
    mw: number
    mh: number
    billboard: boolean
    fluid: boolean
}

export interface AdUnitParams {
    [adUnitId: string]: AdUnitBidderParams
}

export interface AdUnitBidderParams {
    [bidderId: string]: any
}

export interface NativeAds {
    nativeWidths: NativeWidths
    nativeHeights: NativeStringMap
    nativeWidthTypes: NativeStringMap
}

export interface NativeStringMap {
    [key: string]: string
}

export interface NativeWidths {
    side: NativeWidthBreakpoints
    content: NativeWidthBreakpoints
    full: NativeWidthBreakpoints
}

export interface NativeWidthBreakpoints {
    tablet: number
    desktop: number
}

export interface CustomSearchAdSettings {
    googleAdClient: string
    googleAdChannel: string
    channelName: string
    appendKeywords?: string
    plusOnes: boolean
    sellerRatings: boolean
    siteLinks: boolean
    styleId?: string
}

export interface Table {
    rows: Row[]
    align?: CellAlign
    headline?: ContentTag[]
}

export interface Row {
    cells: Cell[]
}

export interface Cell {
    text: ContentTag[]
    align?: CellAlign
    colSpan: number
}

export enum CellAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
}
