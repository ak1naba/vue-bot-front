<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Редактирование события</h1>

      <ErrorAlert v-if="error" :message="error" />

      <form @submit.prevent="updateEvent"
            class="space-y-4 max-w-md"
            v-if="!loading.event">

        <div>
          <label class="block mb-1 font-medium">Название</label>
          <BaseInput v-model="event.title" type="text" placeholder="Введите название" />

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
          <BaseInput v-model="event.start_time" type="datetime-local"/>

          <label class="block mb-1 mt-3 font-medium">Время окончания</label>
          <BaseInput v-model="event.end_time" type="datetime-local"/>

          <label class="block mb-1 mt-3 font-medium">Статус</label>
          <BaseSelector
              v-model="event.status"
              :items="statuses"
              labelField="label"
              valueField="value"
          />
        </div>

        <div class="flex gap-2">
          <BaseButton type="submit" :disabled="loading.event">
            {{ loading.event ? 'Сохраняем...' : 'Сохранить' }}
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

      <!-- Participants -->
      <ParticipantManager
        v-if="!loading.event"
        :eventId="eventId"
        :sportId="event.sport_id"
        @error="handleError"
      />

      <!-- Markets & Odds -->
      <MarketManager
        v-if="!loading.event"
        :eventId="eventId"
        @error="handleError"
      />
    </div>
  </AppLayout>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'
import AppLayout from "@/layouts/AppLayout.vue"
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelector from "@/components/BaseSelector.vue"
import BaseTextarea from "@/components/BaseTextarea.vue"
import ParticipantManager from '@/components/ParticipantManager.vue'
import MarketManager from '@/components/MarketManager.vue'

export default {
  name: 'EventEditView',
  components: {
    BaseSelector,
    BaseTextarea,
    AppLayout,
    ErrorAlert,
    BaseButton,
    BaseInput,
    ParticipantManager,
    MarketManager
  },
  data() {
    return {
      event: {
        title: '',
        description: '',
        sport_id: '',
        start_time: '',
        end_time: '',
        status: 'scheduled'
      },
      statuses: [
        {value: 'scheduled', label: 'Запланировано'},
        {value: 'live', label: 'В эфире'},
        {value: 'finished', label: 'Завершено'},
      ],
      sports: [],
      
      loading: {
        event: false,
        sports: false,
        teams: false,
         // Removed unnecessary loading states
      },
      error: '',
    }
  },
  computed: {
    eventId() {
      return this.$route.params.id
    }
  },
  methods: {
    formatDateForInput(dateStr) {
      if (!dateStr) return ''
      return new Date(dateStr).toISOString().slice(0, 16) // ✅ YYYY-MM-DDTHH:mm
    },

    fetchEvent() {
      this.loading.event = true
      this.error = ''
      this.$event.fetchEvent(this.eventId)
          .then(res => {
            let data = res.data
            data.start_time = this.formatDateForInput(data.start_time)
            data.end_time = this.formatDateForInput(data.end_time)
            this.event = data
            if (data.sport_id) {
              this.fetchTeamsBySport()
            }
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке события.'
          })
          .finally(() => {
            this.loading.event = false
          })
    },

    updateEvent() {
      this.loading.event = true
      this.$event.updateEvent(this.eventId, this.event)
          .then(() => {
            this.$router.push({name: 'Events.Index'})
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при обновлении.'
          })
          .finally(() => {
            this.loading.event = false
          })
    },

    fetchSports() {
      this.loading.sports = true
      this.$sport.fetchSports({count_on_page: -1})
          .then(res => {
            this.sports = res.data.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке списка видов спорта.'
          })
          .finally(() => {
            this.loading.sports = false
          })
    },

    handleError(message) {
      this.error = message
    },

  },

  mounted() {
    this.fetchEvent()
    this.fetchSports()
  }
}
</script>
