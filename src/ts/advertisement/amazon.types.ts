export interface AmazonTag {
    init: (config: AmazonConfig) => void
    fetchBids: (config: AmazonSlotsConfig, callback: (result: AmazonBidResponse[]) => void) => void
    setDisplayBids: () => void
}

export interface AmazonConfig {
    pubID: string
    adServer: string
}

export interface AmazonSlotsConfig {
    timeout: number
    slots: AmazonAdSlot[]
}

export interface AmazonAdSlot {
    slotID: string
    slotName: string
    sizes: number[][]
}

export interface AmazonBidResponse {
    slotID: string
    amzniid: string
    amznbid: string
    amznp: string
    amznsz: string
    size: string
}
