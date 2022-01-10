import HttpStatus from '{{HTTP_STATUS_PATH}}'
import { createCmsContent, createPageStructure } from '{{MS_TEST_UTILS}}'
import providerDefinition from '../{{COMPONENT_NAME}}.redirect'

describe('{{COMPONENT_NAME}}.redirect', () => {
    it('should be valid providerDefinition', () => {
        expect(typeof providerDefinition.obtain).toBe('function')
        expect(providerDefinition.componentName).toBe('{{COMPONENT_NAME}}')
    })

    it('should redirect to the parent URL when the service data contains an error', () => {
        const currentContent = createCmsContent({
            serviceData: {
                error: 'error',
            },
        })
        const page = createPageStructure()
        const url = new URL('https://aktuell.meinestadt.de/foo/polizeimeldungen/123')

        const redirectRequest = providerDefinition.obtain(currentContent, page, url)
        expect(redirectRequest).toBeDefined()
        expect(redirectRequest.statusCode).toBe(HttpStatus.MOVED_PERMANENTLY)
        expect(redirectRequest.url).toBe('/foo/polizeimeldungen')
        expect(redirectRequest.reason).toBe('error')
    })

    it('should not redirect when serviceData does not contain an error', () => {
        const currentContent = createCmsContent({
            serviceData: {},
        })
        const page = createPageStructure()
        const url = new URL('https://aktuell.meinestadt.de/foo/polizeimeldungen/123')

        const redirectRequest = providerDefinition.obtain(currentContent, page, url)
        expect(redirectRequest).toBeNull()
    })
})
