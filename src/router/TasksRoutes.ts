
// make route

import { RouteRecordRaw } from 'vue-router'
import TaskListView from '../views/Task/TaskListView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskListView,
    meta: { layout: 'DefaultLayout' }
  }
]

export default routes