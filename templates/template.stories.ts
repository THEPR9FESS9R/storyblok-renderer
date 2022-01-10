import {{COMPONENT_NAME}} from './{{COMPONENT_NAME}}.vue'

export default {
    title: '{{CHANNEL_NAME}}/{{COMPONENT_TYPE}}/{{COMPONENT_NAME}}',
    component: {{COMPONENT_NAME}},
}

export const Default = (args: any, { argTypes }: any) => ({
    components: { {{COMPONENT_NAME}} },
    props: Object.keys(argTypes),
    template: `<{{COMPONENT_TAG}}></{{COMPONENT_TAG}}>`,
})

