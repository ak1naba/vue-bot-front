<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Админ Вход</h2>

    <form @submit.prevent="login" class="space-y-4">
      <BaseInput v-model="email" type="email" placeholder="Email" />
      <BaseInput v-model="password" type="password" placeholder="Пароль" />

      <ErrorAlert v-if="error" :message="error" @close="error = ''" class="mb-4" />

      <BaseButton :disabled="loading" type="submit">
        {{ loading ? 'Входим...' : 'Войти' }}
      </BaseButton>
    </form>
  </AuthLayout>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'

export default {
  name: 'LoginView',
  components: {
    BaseInput,
    BaseButton,
    AuthLayout,
    ErrorAlert,
  },

  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: '',
    }
  },

  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.error = 'Введите email и пароль'
        return
      }

      this.loading = true
      this.error = ''

      try {
        await this.$auth.login({
          email: this.email,
          password: this.password,
        })

        this.$router.push({ name: 'Dashboard' })
      } catch (err) {
        console.error('Ошибка входа:', err)
        this.error =
            err?.response?.data?.message ||
            'Неверный логин или пароль. Попробуйте ещё раз.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
