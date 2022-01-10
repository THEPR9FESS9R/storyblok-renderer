import { defineComponent, PropType } from 'vue'
import { CmsContent } from '../../../interfaces/pageStructure'
import { selectComponent } from '../../../ts/structureUtils'

export default defineComponent({
    name: 'S_Home',
    props: {
        cmsContent: Object as PropType<CmsContent>,
    },
    setup(props, { attrs, slots, emit }) {
        return {
            selectComponent,
        }
    },
})
