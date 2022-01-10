import { defineComponent, getCurrentInstance, PropType } from 'vue'
import { CmsContent } from '{{PAGE_STRUCTURE_PATH}}'

export default defineComponent({
    name: '{{COMPONENT_NAME}}',
    props: {
        cmsContent: Object as PropType<CmsContent>,
    },
    setup(props, { attrs, slots, emit }) {
        const currentInstance = getCurrentInstance().proxy
        console.log(props, currentInstance, attrs, slots, emit)
    },
})
