<template>
  <section class="mt-8">
    <h2 class="text-xl font-semibold mb-3">Участники</h2>

    <div class="mb-4 max-w-md">
      <label class="block mb-1 font-medium">Добавить участника</label>
      <div class="flex gap-2">
        <BaseSelector
          v-model="form.team_id"
          :items="teams"
          labelField="name"
          valueField="id"
          placeholder="Команда"
        />
        <BaseButton 
          @click="handleAdd" 
          :disabled="loading"
        >
          Добавить
        </BaseButton>
      </div>
    </div>

    <div class="max-w-2xl">
      <table class="w-full table-auto">
        <thead>
          <tr class="text-left">
            <th>Id</th>
            <th>Команда</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in participants" :key="p.id" class="border-t">
            <td class="py-2">{{ p.id }}</td>
            <td class="py-2">{{ p.team?.name ?? '-' }}</td>
            <td class="py-2">
              <BaseButton 
                variant="danger" 
                @click="handleRemove(p.id)"
              >
                Удалить
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { useParticipantStore } from '@/stores/participantStore.js'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelector from '@/components/BaseSelector.vue'

export default {
  name: 'ParticipantManager',
  components: {
    BaseButton,
    BaseInput,
    BaseSelector
  },
  props: {
    eventId: {
      type: [String, Number],
      required: true
    },
    sportId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      form: {
        team_id: null
      },
      participants: [],
      teams: [],
      loading: false,
      error: ''
    }
  },
  watch: {
    eventId: {
      handler() {
        this.loadParticipants()
      },
      immediate: true
    },
    sportId: {
      handler() {
        this.form.team_id = null
      }
    }
  },
  methods: {
    async loadParticipants() {
      this.loading = true
      try {
        const res = await this.$participant.fetchParticipants(this.eventId)
        this.participants = res.data?.data ?? res.data ?? []
      } catch (e) {
        this.error = 'Ошибка при загрузке участников'
        this.$emit('error', this.error)
      } finally {
        this.loading = false
      }
    },
    async handleAdd() {
      this.loading = true
      try {
        await this.$participant.createParticipant(this.eventId, { ...this.form })
        this.resetForm()
        await this.loadParticipants()
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при добавлении участника'
        this.$emit('error', this.error)
      } finally {
        this.loading = false
      }
    },
    async handleRemove(participantId) {
      if (!confirm('Удалить участника?')) return
      this.loading = true
      try {
        await this.$participant.deleteParticipant(this.eventId, participantId)
        await this.loadParticipants()
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при удалении участника'
        this.$emit('error', this.error)
      } finally {
        this.loading = false
      }
    },
    fetchTeamsBySport() {
      this.loading = true
      this.$team.fetchTeamsBySport(this.sportId, {count_on_page: -1})
          .then(res => {
            this.teams = res.data?.data ?? res.data ?? []
          })
          .catch(err => {
            console.warn('Ошибка при загрузке команд:', err)
            this.teams = []
          })
          .finally(() => {
            this.loading = false
          })
    },
    resetForm() {
      this.form.name = ''
      this.form.team_id = null
    }
  },
  mounted() {
    this.loadParticipants()
    this.fetchTeamsBySport()
  }
}
</script>
