import { CmsContent, PageStructure } from '{{PAGE_STRUCTURE_PATH}}'
import { RedirectProvider, RedirectRequest } from '{{CAPABILITIES_PATH}}'
import HttpStatus from '{{HTTP_STATUS_PATH}}'

function obtainRedirectRequest(content: CmsContent, page: PageStructure, currentUrl: URL): RedirectRequest | null {
    if (!content.serviceData.error) {
        return null
    }

    const parentUrl = currentUrl.pathname.substring(0, currentUrl.pathname.lastIndexOf('/'))

    return {
        statusCode: HttpStatus.MOVED_PERMANENTLY,
        reason: content.serviceData.error,
        url: parentUrl,
    } as RedirectRequest
}

const providerDefinition: RedirectProvider = {
    obtain: obtainRedirectRequest,
    componentName: '{{COMPONENT_NAME}}',
}

export default providerDefinition
