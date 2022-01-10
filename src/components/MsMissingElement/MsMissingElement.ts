import { defineComponent, getCurrentInstance, PropType } from 'vue'
import { CmsContent } from '../../interfaces/pageStructure'
import { selectComponent } from '../../ts/structureUtils'

export default defineComponent({
    name: 'MsMissingElement',
    props: {
        cmsContent: Object as PropType<CmsContent>,
    },
    setup(props, { attrs, slots, emit }) {
        const currentInstance = getCurrentInstance().proxy

        return {
            selectComponent
        }
    },
})
