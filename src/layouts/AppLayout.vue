<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
    <!-- Header -->
    <header class="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-4 mb-4 shadow-md flex justify-between items-center">
      <h1 class="text-xl font-bold">Админка</h1>
      <span class="hidden md:block">  Привет, {{ user?.name || 'Админ' }}!</span>
    </header>

    <!-- Body -->
    <div class="flex flex-col md:flex-row flex-1 overflow-hidden gap-4">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main content -->
      <main class="flex-1 overflow-auto p-4 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-md">
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-4 mt-4 text-center text-sm text-gray-600 shadow-md">
      © 2025 MyApp. Все права защищены.
    </footer>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'AppLayout',
  components: { Sidebar },

  computed: {
    user() {
      return this.$users.user
    },
  },

  methods: {
    async getMe() {
      try {
        await this.$users.getMe()
        console.log('Пользователь обновлён:', this.user)
        if (this.user?.role === 'admin') {
          console.log('✅ Это админ!')
        }
      } catch (e) {
        console.warn('Ошибка при загрузке пользователя:', e)
      }
    },

    updateUserName(newName) {
      const updated = { ...this.user, name: newName }
      this.$users.setUser(updated)
    },
  },

  mounted() {
    this.$users.hydrate()
    this.getMe()
  },
}
</script>

