<template>
  <div>
    <!-- Бургер на мобилках -->
    <div class="md:hidden flex justify-between items-center mb-4">
      <span class="font-bold">Меню</span>
      <button @click="toggle" class="focus:outline-none p-2 rounded hover:bg-gray-200 transition">
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        @click="toggle"
      ></div>
    </transition>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        :class="[
          'w-64 p-4 flex flex-col gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md rounded-r-2xl z-50',
          open ? 'fixed inset-y-0 left-0 md:hidden' : 'hidden md:block md:static'
        ]"
      >
        <nav class="flex flex-col gap-2">
          <button
            v-for="item in sidebarItems"
            :key="item.name"
            @click="goTo(item.route)"
            class="text-left px-4 py-3 rounded-2xl hover:bg-purple-200 transition"
          >
            {{ item.name }}
          </button>
        </nav>
      </aside>
    </transition>
  </div>
</template>

<script>
import { SidebarItems } from '@/constants/sidebarItems'

export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarItems: SidebarItems,
      open: false,
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    goTo(route) {
      this.$router.push({ name: route })
      this.open = false
    },
  },
}
</script>

<style>
/* Slide animation для sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-110%);
}
.slide-leave-to {
  transform: translateX(-110%);
}

/* Плавное появление overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>