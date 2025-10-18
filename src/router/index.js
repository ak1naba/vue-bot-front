// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './public'
import privateRoutes from './private'
import {useUserStore} from "@/stores/userStore.js";

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
  const userStore = useUserStore()
  if (!userStore.user) userStore.hydrate()

  if (to.meta.requiresAuth && !userStore.user) {
    return next({ name: 'Login' })
  }

  if (!to.meta.requiresAuth && userStore.user) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
