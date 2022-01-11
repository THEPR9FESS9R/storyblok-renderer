import { defineComponent, PropType } from 'vue'
import { CmsContent } from '../../interfaces/pageStructure'

export default defineComponent({
    name: 'teaser',
    props: {
        cmsContent: Object as PropType<CmsContent>,
    },
})
