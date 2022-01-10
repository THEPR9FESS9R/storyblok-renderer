import 'html-validate/jest'
import {{COMPONENT_NAME}} from '../{{COMPONENT_NAME}}.vue'
import { mount } from '@vue/test-utils'

describe('{{COMPONENT_NAME}}', () => {
    it('should render correctly', () => {
        const subject = mount({{COMPONENT_NAME}})

        expect(subject.attributes('data-component')).toBe('{{COMPONENT_NAME}}')
        expect(subject.html()).toMatchSnapshot()
        expect(subject.html()).toHTMLValidate()

        /* wrapper must be manually destroyed */
        subject.destroy()
    })
})
