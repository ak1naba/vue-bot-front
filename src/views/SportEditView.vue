<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Редактирование вида спорта</h1>

    <ErrorAlert v-if="error" :message="error" />

    <form @submit.prevent="updateSport" class="space-y-4 max-w-md">
      <div>
        <label class="block mb-1 font-medium">Название</label>
        <input v-model="name" type="text" class="w-full border rounded px-3 py-2" />
      </div>

      <div class="flex gap-2">
        <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-500 text-white rounded">
          {{ loading ? 'Сохраняем...' : 'Сохранить' }}
        </button>
        <router-link to="/sports" class="px-4 py-2 bg-gray-300 rounded">Отмена</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'

export default {
  name: 'SportEditView',
  components: { ErrorAlert },
  props: ['id'],
  data() {
    return {
      name: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    fetchSport() {
      this.loading = true
      this.error = ''
      this.$sport.show(this.id)
          .then(res => {
            this.name = res.data.name
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке вида спорта.'
          })
          .finally(() => {
            this.loading = false
          })
    },
    updateSport() {
      if (!this.name) {
        this.error = 'Введите название'
        return
      }

      this.loading = true
      this.$sport.update(this.id, { name: this.name })
          .then(() => {
            this.$router.push({ name: 'Sports.Index' })
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при обновлении.'
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    this.fetchSport()
  }
}
</script>
