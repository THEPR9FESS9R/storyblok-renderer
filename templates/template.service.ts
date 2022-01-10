import {
    ProviderExecutionOrder,
    ServiceDataProvider,
    ServiceDataRequest,
    ServiceDataScope,
} from '{{SERVICE_DATA_PROVIDER}}'

export interface ComponentNameServiceData {
    some: string
}

function provide(request: ServiceDataRequest): Promise<ComponentNameServiceData> {
    return Promise.resolve({
        some: 'test'
    })
}

const providerDefinition: ServiceDataProvider = {
    scope: ServiceDataScope.ELEMENT_ID,
    execution: ProviderExecutionOrder.OUT_OF_ORDER,
    componentName: '{{COMPONENT_NAME}}',
    provider: provide,
    breakOnError: false,
}

export default providerDefinition
