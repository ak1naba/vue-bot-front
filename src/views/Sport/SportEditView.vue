<template>
  <AppLayout>
    <div>
      <h1 class="text-2xl font-bold mb-4">Редактирование вида спорта</h1>

      <ErrorAlert v-if="error" :message="error" />

      <form @submit.prevent="updateSport" class="space-y-4 max-w-md">
        <div>
          <label class="block mb-1 font-medium">Название</label>
          <BaseInput v-model="name" type="text" placeholder="Введите название" />
        </div>

        <div class="flex gap-2">
          <BaseButton type="submit" :disabled="loading">
            {{ loading ? 'Сохраняем...' : 'Сохранить' }}
          </BaseButton>

          <BaseButton type="button" variant="secondary"   @click="this.$router.push({ name: 'Sports.Index'})">>Отмена</BaseButton>

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
  name: 'SportEditView',
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
  computed: {
    sportId() {
      return this.$route.params.id
    }
  },
  methods: {
    fetchSport() {
      this.loading = true
      this.error = ''
      this.$sport.fetchSport(this.sportId)
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
      this.$sport.updateSport(this.sportId, {name: this.name})
          .then(() => {
            this.$router.push({name: 'Sports.Index'})
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