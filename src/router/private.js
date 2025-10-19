// src/router/routes.js
import DashboardView from '@/views/DashboardView.vue'
import SportIndexView from '@/views/Sport/SportIndexView.vue'
import SportEditView from '@/views/Sport/SportEditView.vue'
import SportCreateView from "@/views/Sport/SportCreateView.vue";

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
    name: 'Sports.Index',
    component: SportIndexView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/sports/create',
    name: 'Sports.Create',
    component: SportCreateView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/sports/:id/edit',
    name: 'Sports.Edit',
    component: SportEditView,
    meta: {
      requiresAuth: true
    },
  },
]

