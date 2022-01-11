import { computed, defineComponent, PropType } from 'vue'
import { PageStructure } from '../../interfaces/pageStructure'
import RecursiveRenderer from '../RecursiveRenderer/RecursiveRenderer.vue'

export default defineComponent({
    name: 'DefaultView',
    props: {
        pageStructure: Object as PropType<PageStructure>,
    },
    components: {
        RecursiveRenderer,
    },
    setup(props) {
        return {
            content: computed(() => props.pageStructure.story.content)
        }
    },
})
