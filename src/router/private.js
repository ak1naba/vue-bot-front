// src/router/routes.js
import DashboardView from '@/views/DashboardView.vue'
import SportIndexView from '@/views/SportIndexView.vue'
import SportEditView from '@/views/SportEditView.vue'

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/sports',
    name: 'SportIndex',
    component: SportIndexView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/sports/:id/edit',
    name: 'SportEdit',
    component: SportEditView,
    meta: {
      requiresAuth: true
    },
  },

]

