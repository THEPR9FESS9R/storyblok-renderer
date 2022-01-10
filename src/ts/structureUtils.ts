/**
 * @module composables/structureUtils
 */

import { getCurrentInstance } from 'vue'
import { CmsContent } from '../interfaces/pageStructure'

export const FALLBACK_COMPONENT = 'MsMissingElement'
const S_META_DATA_COMPONENT = 'S_Meta_Data'
export const E_TEXT_COMPONENT = 'E_Text'

export function getCorrectName(content: CmsContent): string {
    if (!content.name) {
        return content.label
    }

    let result
    switch (content.name.toLocaleLowerCase()) {
        case 'text':
            result = content.label
            break
        default:
            result = content.name
            break
    }
    return result
}

export function isMetaDataComponent(content: CmsContent): boolean {
    return getCorrectName(content) === S_META_DATA_COMPONENT
}

export function isTextComponent(content: CmsContent): boolean {
    return cmsElementMapping(getCorrectName(content)) === E_TEXT_COMPONENT
}

export function selectComponent(cmsContent: CmsContent): string {
    const currentInstance = getCurrentInstance().proxy

    if (isMetaDataComponent(cmsContent)) {
        return ''
    }

    if (isTextComponent(cmsContent)) {
        return E_TEXT_COMPONENT
    }

    const globalComponents = currentInstance?.$store?.getters?.registeredComponents || []
    if ((!currentInstance.$options || !currentInstance.$options.components) && globalComponents.length === 0) {
        return FALLBACK_COMPONENT
    }

    const instanceComponents = currentInstance.$options.components || {}
    const components = [...Object.keys(instanceComponents), ...globalComponents]
    const matches = components.filter((componentName) => {
        return componentName === cmsElementMapping(getCorrectName(cmsContent))
    })

    const componentName = matches.length >= 1 ? matches[0] : FALLBACK_COMPONENT
    // TODO: re-enable this to make sunrise being strict again. For now we want to test sunrise and not see HTTP 503 all the time.
    /*if (process.env.NODE_ENV === 'production' && componentName === FALLBACK_COMPONENT) {
        throw new Error('503')
    }*/

    return componentName
}

function cmsElementMapping(name: string): string {
    let id
    switch (name) {
        case 'S_Home':
        case 'S_Detail':
        case 'S_Results':
            id = 'S_Home'
            break
        // @TODO: remove M_Resultlist_Predefined completely after Tankfuchs result list is extracted from it in Pirobase
        case 'M_Resultlist_Predefined':
        case 'S_Home_Rows':
        case 'S_Detail_Rows':
        case 'S_Results_Rows':
            id = 'S_Rows'
            break
        case 'S_Home_Columns':
        case 'S_Detail_Columns':
        case 'S_Results_Columns':
            id = 'S_Columns'
            break
        case 'S_Home_Duo':
        case 'S_Detail_Duo':
        case 'S_Results_Duo':
            id = 'S_Duo'
            break
        case 'S_Home_Marginal':
        case 'S_Detail_Marginal':
        case 'S_Results_Marginal':
            id = 'S_Marginal'
            break
        case 'S_Home_Marginal_Content':
        case 'S_Detail_Marginal_Content':
        case 'S_Results_Marginal_Content':
            id = 'S_Marginal_Content'
            break
        case 'S_Home_Marginal_Side':
        case 'S_Detail_Marginal_Side':
        case 'S_Results_Marginal_Side':
            id = 'S_Marginal_Side'
            break
        case 'Article_Paragraph':
            id = 'M_Article_Paragraph'
            break
        case 'Text':
            id = 'E_Text'
            break
        case 'Survey':
            id = 'M_Survey'
            break
        default:
            id = name
            break
    }
    return id
}
