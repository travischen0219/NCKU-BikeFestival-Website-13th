import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Parent from '@/components/Parent'
import News from '@/components/News'
import Department from '@/components/Department'
import Activity from '@/components/Activity'
import SignUp from '@/components/SignUp'
import About from '@/components/About'
import Sponsor from '@/components/Sponsor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/parent',
      name: 'Parent',
      component: Parent,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/news',
      name: 'News',
      component: News,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/department',
      name: 'Department',
      component: Department,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/sponsor',
      name: 'Sponsor',
      component: Sponsor
    }
  ]
})
