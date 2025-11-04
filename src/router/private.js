// src/router/routes.js
import DashboardView from '@/views/DashboardView.vue'
import SportIndexView from '@/views/Sport/SportIndexView.vue'
import SportEditView from '@/views/Sport/SportEditView.vue'
import SportCreateView from "@/views/Sport/SportCreateView.vue";
import TeamIndexView from "@/views/Team/TeamIndexView.vue";
import TeamCreateView from "@/views/Team/TeamCreateView.vue";
import TeamEditView from "@/views/Team/TeamEditView.vue";
import EventIndexView from "@/views/Events/EventIndexView.vue";
import EventCreateView from "@/views/Events/EventCreateView.vue";
import EventEditView from "@/views/Events/EventEditView.vue";

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    },
  },

  // Sport
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


  // Team
  {
    path: '/teams',
    name: 'Teams.Index',
    component: TeamIndexView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/teams/create',
    name: 'Teams.Create',
    component: TeamCreateView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/teams/:id/edit',
    name: 'Teams.Edit',
    component: TeamEditView,
    meta: {
      requiresAuth: true
    },
  },

  // Events
  {
    path: '/events',
    name: 'Events.Index',
    component: EventIndexView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/events/create',
    name: 'Events.Create',
    component: EventCreateView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/events/:id/edit',
    name: 'Events.Edit',
    component: EventEditView,
    meta: {
      requiresAuth: true
    },
  },


]

