<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Виды спорта</h1>

      <div v-if="loading" class="mb-4">Загрузка...</div>
      <ErrorAlert v-if="error" :message="error" />

      <table class="min-w-full bg-white shadow rounded">
        <thead>
        <tr>
          <th class="px-4 py-2 border-b text-center">ID</th>
          <th class="px-4 py-2 border-b text-center">Название</th>
          <th class="px-4 py-2 border-b text-center">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sport in sports.data" :key="sport.id">
          <td class="px-4 py-2 border-b text-center">{{ sport.id }}</td>
          <td class="px-4 py-2 border-b text-center">{{ sport.name }}</td>
          <td class="px-4 py-2 border-b text-center">
            <div class="flex gap-2 justify-center">
              <BaseButton
                  @click="this.$router.push({ name: 'Sports.Edit', params: { id: sport.id }})"
                  variant="primary"
                  class="text-sm px-2 py-1"
              >
                Редактировать
              </BaseButton>
              <BaseButton
                  @click="deleteSport(sport.id)"
                  variant="danger"
                  class="text-sm px-2 py-1"
              >
                Удалить
              </BaseButton>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-between items-center">
        <BaseButton
            @click="prevPage"
            :disabled="!sports.prev_page_url"
            variant="secondary"
        >
          Назад
        </BaseButton>
        <BaseButton
            @click="nextPage"
            :disabled="!sports.next_page_url"
            variant="secondary"
        >
          Вперед
        </BaseButton>
      </div>

      <div class="mt-4">
        <router-link :to="{ name: 'Sports.Create' }">
          <BaseButton variant="primary">
            Добавить вид спорта
          </BaseButton>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'
import AppLayout from "@/layouts/AppLayout.vue"
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'SportIndexView',
  components: {
    AppLayout,
    ErrorAlert,
    BaseButton
  },
  data() {
    return {
      sports: {data: []},
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

      this.$sport.fetchSports({
        page: this.page,
        count_on_page: this.perPage
      })
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

      this.$sport.deleteSport(id)
          .then(() => {
            this.fetchSports()
          })
          .catch(err => {
            alert(err?.response?.data?.message)
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