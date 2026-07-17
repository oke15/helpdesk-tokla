import DefaultTheme from 'vitepress/theme'
import AnswerAccordion from '../components/AnswerAccordion.vue'
import BlogDate from '../components/BlogDate.vue'
import BlogList from '../components/BlogList.vue'
import GuideList from '../components/GuideList.vue'
import TagBadge from '../components/TagBadge.vue'
import './style.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('AnswerAccordion', AnswerAccordion)
        app.component('BlogDate', BlogDate)
        app.component('BlogList', BlogList)
        app.component('GuideList', GuideList)
        app.component('TagBadge', TagBadge)
    },
}
