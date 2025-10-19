<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Добавление вида спорта</h1>

      <ErrorAlert v-if="error" :message="error"/>

      <form @submit.prevent="createSport" class="space-y-4 max-w-md">
        <div>
          <label class="block mb-1 font-medium">Название</label>
          <BaseInput v-model="name" type="text" placeholder="Введите название вида спорта"/>
        </div>

        <div class="flex gap-2">
          <BaseButton type="submit" :disabled="loading">
            {{ loading ? 'Создание...' : 'Создать' }}
          </BaseButton>

          <BaseButton
              type="button"
              variant="secondary"
              @click="this.$router.push({ name: 'Sports.Index'})">
            Отмена
          </BaseButton>

        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'
import AppLayout from "@/layouts/AppLayout.vue"
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

export default {
  name: 'SportCreateView',
  components: {
    AppLayout,
    ErrorAlert,
    BaseButton,
    BaseInput
  },
  data() {
    return {
      name: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    createSport() {
      if (!this.name) {
        this.error = 'Введите название'
        return
      }

      this.loading = true
      this.$sport.createSport(
          {
            name: this.name
          }
      )
          .then(() => {
            this.$router.push({name: 'Sports.Index'})
          })
          .catch(err => {
            this.error = err?.response?.data?.message
          })
          .finally(() => {
            this.loading = false
          })
    }
  }
}
</script>