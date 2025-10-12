<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Админ Вход</h2>
    <form @submit.prevent="login" class="space-y-4">
      <BaseInput v-model="email" type="email" placeholder="Email" />
      <BaseInput v-model="password" type="password" placeholder="Пароль" />
      <BaseButton>Войти</BaseButton>
    </form>
  </AuthLayout>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

export default {
  name: 'LoginView',
  components: {
    BaseInput,
    BaseButton,
    AuthLayout,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.$router.push({ name: 'Dashboard' })
      }
    },
  },
}
</script>
