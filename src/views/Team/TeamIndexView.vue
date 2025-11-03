<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Спортивные команды</h1>

      <div v-if="loading" class="mb-4">Загрузка...</div>
      <ErrorAlert v-if="error" :message="error" />

      <table class="min-w-full bg-white shadow rounded">
        <thead>
        <tr>
          <th class="px-4 py-2 border-b text-center">ID</th>
          <th class="px-4 py-2 border-b text-center">Название</th>
          <th class="px-4 py-2 border-b text-center">Вид Спорта</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="team in teams.data" :key="team.id">
          <td class="px-4 py-2 border-b text-center">{{ team.id }}</td>
          <td class="px-4 py-2 border-b text-center">{{ team.name }}</td>
          <td class="px-4 py-2 border-b text-center">{{ team.sport.name }}</td>
          <td class="px-4 py-2 border-b text-center">
            <div class="flex gap-2 justify-center">
              <BaseButton
                  @click="this.$router.push({ name: 'Teams.Edit', params: { id: team.id }})"
                  variant="primary"
                  class="text-sm px-2 py-1"
              >
                Редактировать
              </BaseButton>
              <BaseButton
                  @click="deleteTeam(team.id)"
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
            :disabled="!teams.prev_page_url"
            variant="secondary"
        >
          Назад
        </BaseButton>
        <BaseButton
            @click="nextPage"
            :disabled="!teams.next_page_url"
            variant="secondary"
        >
          Вперед
        </BaseButton>
      </div>

      <div class="mt-4">
        <router-link :to="{ name: 'Teams.Create' }">
          <BaseButton variant="primary">
            Добавить спортивную команду
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
      teams: {data: []},
      loading: false,
      error: '',
      page: 1,
      perPage: 10,
    }
  },
  methods: {
    fetchTeams() {
      this.loading = true
      this.error = ''

      this.$team.fetchTeams({
        page: this.page,
        count_on_page: this.perPage
      })
          .then(res => {
            this.teams = res.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке списка видов спорта.'
          })
          .finally(() => {
            this.loading = false
          })
    },
    deleteTeam(id) {
      if (!confirm('Вы уверены, что хотите удалить эту спортивную команду?')) return

      this.$team.deleteTeam(id)
          .then(() => {
            this.fetchTeams()
          })
          .catch(err => {
            alert(err?.response?.data?.message)
          })
    },
    nextPage() {
      if (this.teams.next_page_url) {
        this.page++
        this.fetchTeams()
      }
    },
    prevPage() {
      if (this.teams.prev_page_url) {
        this.page--
        this.fetchTeams()
      }
    }
  },
  mounted() {
    this.fetchTeams()
  }
}
</script>