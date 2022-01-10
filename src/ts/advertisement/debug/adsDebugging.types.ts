import { AdUnitBidder, MediaTypes, PrebidBidResponse } from '../prebid.types'
import { AdUnit } from '../ads.types'
import { AmazonAdSlot, AmazonBidResponse } from '../amazon.types'
export enum ReportTypes {
    INITIAL = 'Initiale Werbung',
    BREAKPOINT_CHANGE = 'Breakpoint Change',
    REFRESH = 'Refresh',
}
export interface DebugAdsAuction {
    date: Date
    type: ReportTypes
    adUnits: DebugAdUnit[]
}

export interface DebugAdUnit extends AdUnit {
    prebidRequests: AdUnitBidder[]
    prebidResponses: PrebidBidResponse[]
    amazonRequest: AmazonAdSlot | null
    amazonResponse: AmazonBidResponse | null
}

export interface DebugAdUnitBidder extends AdUnitBidder {
    mediaType: MediaTypes
}
