<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Виды спорта</h1>

      <div v-if="loading" class="mb-4">Загрузка...</div>
      <ErrorAlert v-if="error" :message="error" />

      <table class="min-w-full bg-white shadow rounded">
        <thead>
        <tr>
          <th class="px-4 py-2 border-b">ID</th>
          <th class="px-4 py-2 border-b">Название</th>
          <th class="px-4 py-2 border-b">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sport in sports.data" :key="sport.id">
          <td class="px-4 py-2 border-b">{{ sport.id }}</td>
          <td class="px-4 py-2 border-b">{{ sport.name }}</td>
          <td class="px-4 py-2 border-b flex gap-2">
            <router-link :to="{ name: 'SportEdit', params: { id: sport.id } }" class="text-blue-500">
              Редактировать
            </router-link>
            <button @click="deleteSport(sport.id)" class="text-red-500">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-between items-center">
        <button @click="prevPage" :disabled="!sports.prev_page_url" class="px-4 py-2 bg-gray-200 rounded">
          Назад
        </button>
        <button @click="nextPage" :disabled="!sports.next_page_url" class="px-4 py-2 bg-gray-200 rounded">
          Вперед
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: 'SportIndexView',
  components: {AppLayout, ErrorAlert },
  data() {
    return {
      sports: { data: [] },
      loading: false,
      error: '',
      page: 1,
      perPage: 10,
    }
  },
  methods: {
    fetchSports() {
      this.loading = true
      this.error = ''

      this.$sport.fetchSports({ page: this.page, count_on_page: this.perPage })
          .then(res => {
            this.sports = res.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке списка видов спорта.'
          })
          .finally(() => {
            this.loading = false
          })
    },
    deleteSport(id) {
      if (!confirm('Вы уверены, что хотите удалить этот вид спорта?')) return

      this.$sport.delete(id)
          .then(() => {
            this.fetchSports()
          })
          .catch(err => {
            alert(err?.response?.data?.message || 'Ошибка при удалении.')
          })
    },
    nextPage() {
      if (this.sports.next_page_url) {
        this.page++
        this.fetchSports()
      }
    },
    prevPage() {
      if (this.sports.prev_page_url) {
        this.page--
        this.fetchSports()
      }
    }
  },
  mounted() {
    this.fetchSports()
  }
}
</script>
