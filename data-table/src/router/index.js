import Vue from 'vue'
import Router from 'vue-router'
import TableData from '@/components/TableData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableData',
      component: TableData
    }
  ]
})
