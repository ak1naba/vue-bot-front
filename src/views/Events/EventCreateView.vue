<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Создание события</h1>

      <ErrorAlert v-if="error" :message="error"/>

      <form @submit.prevent="createEvent" class="space-y-4 max-w-md">

        <div>
          <label class="block mb-1 font-medium">Название</label>
          <BaseInput v-model="event.title" placeholder="Введите название события"/>

          <label class="block mb-1 mt-3 font-medium">Описание</label>
          <BaseTextarea v-model="event.description" placeholder="Введите описание события"/>

          <label class="block mb-1 mt-3 font-medium">Вид спорта</label>
          <BaseSelector
              v-model="event.sport_id"
              :items="sports"
              labelField="name"
              valueField="id"
              placeholder="Выберите спорт"
          />

          <label class="block mb-1 mt-3 font-medium">Время начала</label>
          <BaseInput
              v-model="event.start_time"
              type="datetime-local"
          />

          <label class="block mb-1 mt-3 font-medium">Время окончания</label>
          <BaseInput
              v-model="event.end_time"
              type="datetime-local"
          />

          <label class="block mb-1 mt-3 font-medium">Статус</label>
          <BaseSelector
              v-model="event.status"
              :items="statuses"
              labelField="label"
              valueField="value"
              placeholder="Выберите статус"
          />
        </div>

        <div class="flex gap-2">
          <BaseButton type="submit" :disabled="loading">
            {{ loading ? 'Создание...' : 'Создать' }}
          </BaseButton>

          <BaseButton
              type="button"
              variant="secondary"
              @click="$router.push({ name: 'Events.Index'})"
          >
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
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseSelector from "@/components/BaseSelector.vue";

export default {
  name: 'EventCreateView',
  components: {
    BaseSelector,
    BaseTextarea,
    AppLayout,
    ErrorAlert,
    BaseButton,
    BaseInput
  },
  data() {
    return {
      event: {
        sport_id: '',
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        status: 'scheduled',
      },
      statuses: [
        { value: 'scheduled', label: 'Запланировано' },
        { value: 'live', label: 'В эфире' },
        { value: 'finished', label: 'Завершено' },
      ],
      sports: [],
      loading: false,
      error: '',
    }
  },
  methods: {
    createEvent() {
      this.loading = true
      this.$event.createEvent(this.event)
          .then(() => {
            this.$router.push({ name: 'Events.Index' })
          })
          .catch(err => {
            this.error = err?.response?.data?.message
          })
          .finally(() => {
            this.loading = false
          })
    },

    fetchSports() {
      this.loading = true
      this.error = ''

      this.$sport.fetchSports({ count_on_page: -1 })
          .then(res => {
            this.sports = res.data.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message ||
                'Ошибка при загрузке списка видов спорта.'
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    this.fetchSports()
  }
}
</script>

