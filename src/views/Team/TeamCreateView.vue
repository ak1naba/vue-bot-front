<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Добавление спортивной команды</h1>

      <ErrorAlert v-if="error" :message="error"/>

      <form @submit.prevent="createTeam" class="space-y-4 max-w-md">
        <div>
          <label class="block mb-1 mt-1  font-medium">Название</label>
          <BaseInput v-model="team.name" type="text" placeholder="Введите название спортивной команлы"/>
          <label class="block mb-1 mt-1 font-medium">Вид спорта</label>
          <BaseSelector
              v-model="team.sport_id"
              :items="sports"
              labelField="name"
              valueField="id"
              placeholder="Выберите спорт"
          />
        </div>

        <div class="flex gap-2">
          <BaseButton type="submit" :disabled="loading">
            {{ loading ? 'Создание...' : 'Создать' }}
          </BaseButton>

          <BaseButton
              type="button"
              variant="secondary"
              @click="this.$router.push({ name: 'Teams.Index'})">
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
import BaseSelector from "@/components/BaseSelector.vue";

export default {
  name: 'SportCreateView',
  components: {
    BaseSelector,
    AppLayout,
    ErrorAlert,
    BaseButton,
    BaseInput
  },
  data() {
    return {
      team: {
        name: '',
        sport_id: '',
      },
      sports: [],
      loading: false,
      error: '',
    }
  },
  methods: {
    createTeam() {
      this.loading = true
      this.$team.createTeam(this.team)
          .then(() => {
            this.$router.push({name: 'Teams.Index'})
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

      this.$sport.fetchSports({
        page: this.page,
        count_on_page: -1
      })
          .then(res => {
            this.sports = res.data.data
          })
          .catch(err => {
            this.error = err?.response?.data?.message || 'Ошибка при загрузке списка видов спорта.'
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