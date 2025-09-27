import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import defaultRoutes from './defaultRoutes'
import tasksRoutes from './TasksRoutes'

const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  ...tasksRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
