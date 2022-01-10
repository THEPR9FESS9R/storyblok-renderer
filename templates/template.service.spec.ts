import { ProviderExecutionOrder, ServiceDataScope } from '{{SERVICE_DATA_PROVIDER}}'
import { createServiceDataRequest } from '{{MS_TEST_UTILS}}'
import providerDefinition from '../{{COMPONENT_NAME}}.service'

describe('{{COMPONENT_NAME}} service provider', () => {
    it('should set correct provider definition', async () => {
        expect(providerDefinition.breakOnError).toBe(false)
        expect(providerDefinition.componentName).toBe('{{COMPONENT_NAME}}')
        expect(providerDefinition.execution).toBe(ProviderExecutionOrder.OUT_OF_ORDER)
        expect(providerDefinition.scope).toBe(ServiceDataScope.ELEMENT_ID)
        expect(typeof providerDefinition.provider).toBe('function')
    })

    it('should set call provider', async () => {
        const serviceDataRequest = createServiceDataRequest()

        const result = await providerDefinition.provider(serviceDataRequest)

        expect(result).toStrictEqual({
            some: 'test',
        })
    })
})
