<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Спортивные события</h1>

      <div v-if="loading" class="mb-4">Загрузка...</div>
      <ErrorAlert v-if="error" :message="error" />

      <table class="min-w-full bg-white shadow rounded">
        <thead>
        <tr>
          <th class="px-4 py-2 border-b text-center">ID</th>
          <th class="px-4 py-2 border-b text-center">Название</th>
          <th class="px-4 py-2 border-b text-center">Вид спорта</th>
          <th class="px-4 py-2 border-b text-center">Статус</th>
          <th class="px-4 py-2 border-b text-center">Начало</th>
          <th class="px-4 py-2 border-b text-center">Действия</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="event in events.data" :key="event.id">
          <td class="px-4 py-2 border-b text-center">{{ event.id }}</td>
          <td class="px-4 py-2 border-b text-center">{{ event.title }}</td>
          <td class="px-4 py-2 border-b text-center">{{ event.sport_id }}</td>
          <td class="px-4 py-2 border-b text-center">{{ event.status }}</td>
          <td class="px-4 py-2 border-b text-center">
            {{ new Date(event.start_time).toLocaleString() }}
          </td>
          <td class="px-4 py-2 border-b text-center">
            <div class="flex gap-2 justify-center">
              <BaseButton
                  @click="this.$router.push({ name: 'Events.Edit', params: { id: event.id }})"
                  variant="primary"
                  class="text-sm px-2 py-1"
              >
                Редактировать
              </BaseButton>

              <BaseButton
                  @click="deleteEvent(event.id)"
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
            :disabled="!events.prev_page_url"
            variant="secondary"
        >
          Назад
        </BaseButton>

        <BaseButton
            @click="nextPage"
            :disabled="!events.next_page_url"
            variant="secondary"
        >
          Вперед
        </BaseButton>
      </div>

      <div class="mt-4">
        <router-link :to="{ name: 'Events.Create' }">
          <BaseButton variant="primary">
            Добавить событие
          </BaseButton>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import ErrorAlert from "@/components/ErrorAlert.vue"
import AppLayout from "@/layouts/AppLayout.vue"
import BaseButton from "@/components/BaseButton.vue"

export default {
  name: "EventIndexView",
  components: { AppLayout, ErrorAlert, BaseButton },

  data() {
    return {
      events: { data: [] },
      loading: false,
      error: "",
      page: 1,
      perPage: 10,
    }
  },

  methods: {
    fetchEvents() {
      this.loading = true
      this.error = ""

      this.$event.fetchEvents({
        page: this.page,
        count_on_page: this.perPage
      })
          .then(res => {
            this.events = res.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message || "Ошибка при загрузке событий"
          })
          .finally(() => {
            this.loading = false
          })
    },

    deleteEvent(id) {
      if (!confirm("Удалить событие?")) return

      this.$event.deleteEvent(id)
          .then(() => this.fetchEvents())
          .catch(err => alert(err?.response?.data?.message))
    },

    nextPage() {
      if (this.events.next_page_url) {
        this.page++
        this.fetchEvents()
      }
    },

    prevPage() {
      if (this.events.prev_page_url) {
        this.page--
        this.fetchEvents()
      }
    }
  },

  mounted() {
    this.fetchEvents()
  }
}
</script>
