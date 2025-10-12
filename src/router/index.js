// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './public'
import privateRoutes from './private'

const routes = [
  ...publicRoutes,
  ...privateRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/login' } // редирект для неизвестных маршрутов
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = true
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
