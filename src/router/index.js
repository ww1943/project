import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: r => require.ensure([], () => r(require('@/view/index.vue')))
    },
    {
      path: '/getPosition',
      name: 'getPosition',
      component:r => require.ensure([], () => r(require('@/view/position.vue')))
    }
  ]
})
