import DashboardView from '@/views/DashboardView.vue'

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { layout: 'app', requiresAuth: true },
  },
]
