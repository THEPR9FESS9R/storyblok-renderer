import { IncomingHttpHeaders } from 'http'

export interface DebugContext {
    calls: ComponentCall[]
    serviceCalls: ServiceCall[]
    headers: IncomingHttpHeaders
    outputEnabled: boolean
    errors: Error[]
}

export interface ComponentCall {
    name: string
    type: string
}

export interface ServiceCall {
    url: string
}
