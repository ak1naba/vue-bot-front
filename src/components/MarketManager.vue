<template>
  <section class="mt-8">
    <h2 class="text-xl font-semibold mb-3">Варианты исходов и коэффициенты</h2>

    <div class="mb-4 max-w-md">
      <label class="block mb-1 font-medium">Добавить исход</label>
      <div class="flex flex-col gap-3">
        <div class="flex gap-2">
          <BaseSelector
            v-model="marketForm.type"
            :items="marketTypes"
            labelField="name"
            valueField="value"
            placeholder="Тип исхода"
          />
          <BaseSelector
            v-if="participantOptions.length"
            v-model="marketForm.participant_id"
            :items="participantOptions"
            labelField="name"
            valueField="id"
            placeholder="Участник (опционально)"
          />
        </div>
        <BaseInput 
          v-model="marketForm.description" 
          placeholder="Описание исхода" 
        />
        <BaseButton 
          @click="handleAddMarket" 
          :disabled="loadingMarket"
          class="self-start"
        >
          Добавить исход
        </BaseButton>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="m in markets.data" :key="m.id" class="p-4 border rounded">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold">
              {{ m.type }} 
              <span class="text-sm text-gray-500">(id: {{ m.id }})</span>
            </h3>
            <div class="text-sm text-gray-600">{{ m.description }}</div>
            <div v-if="m.participant" class="text-sm text-gray-500">
              Участник: {{ m.participant.team?.name ?? '-' }}
            </div>
          </div>
          <div class="flex gap-2">
            <BaseButton 
              variant="danger" 
              @click="handleDeleteMarket(m.id)"
            >
              Удалить
            </BaseButton>
          </div>
        </div>

        
          <div class="mt-3">
          <label class="block mb-1 font-medium">Добавить коэффициент</label>
          <div class="flex gap-2 mb-3">
            <BaseInput 
              :modelValue="oddForms[m.id]?.value || ''" 
              @update:modelValue="updateOddFormValue(m.id, $event)"
              placeholder="Значение коэффициента" 
              type="number" 
              step="0.01"
            />
            <BaseButton 
              @click="handleAddOdd(m.id)" 
              :disabled="loadingOdd"
            >
              Добавить
            </BaseButton>
          </div>

          <div>
            <h4 class="font-medium mb-1">Коэффициенты</h4>
            <ul class="space-y-1">
              <li 
                v-for="odd in oddsByMarket[m.id] || []" 
                :key="odd.id" 
                class="flex justify-between items-center py-2 border-t"
              >
                <div>
                  <div class="font-medium">{{ odd.label }} — {{ odd.value }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(odd.created_at ?? odd.updated_at) }}
                  </div>
                </div>
                <div>
                  <BaseButton 
                    variant="danger" 
                    @click="handleDeleteOdd(m.id, odd.id)"
                  >
                    Удалить
                  </BaseButton>
                </div>
              </li>
            </ul>
          </div>
        </div>  
      </div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <BaseButton
        @click="prevPage"
        :disabled="!markets.prev_page_url"
        variant="secondary"
      >
        Назад
      </BaseButton>

      <BaseButton
        @click="nextPage"
        :disabled="!markets.next_page_url"
        variant="secondary"
      >
        Вперед
      </BaseButton>
    </div>
  </section>
</template>

<script>
import { useMarketStore } from '@/stores/marketStore.js'
import { useOddStore } from '@/stores/oddStore.js'
import { useParticipantStore } from '@/stores/participantStore.js'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelector from '@/components/BaseSelector.vue'

export default {
  name: 'MarketManager',
  components: {
    BaseButton,
    BaseInput,
    BaseSelector
  },
  props: {
    eventId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      marketForm: {
        type: '',
        description: '',
        participant_id: null
      },
      oddForms: {},
      markets: [],
      participants: [],
      participantOptions: [],
      oddsByMarket: {},
      loadingMarket: false,
      loadingOdd: false,
      error: '',
      page: 1,
      perPage: 10,
      marketTypes: [
        { value: 'win', name: 'Победа' },
        { value: 'draw', name: 'Ничья' },
        { value: 'total', name: 'Тотал' },
        { value: 'handicap', name: 'Фора' },
        { value: 'both_score', name: 'Обе забьют' },
        { value: 'correct_score', name: 'Точный счет' },
        { value: 'first_goal', name: 'Первый гол' }
      ]
    }
  },
  watch: {
    eventId: {
      handler() {
        this.loadMarkets()
        this.loadParticipants()
      },
      immediate: true
    }
  },
  methods: {
    async loadMarkets() {
      this.loadingMarket = true
      try {
        const res = await this.$market.fetchMarkets(this.eventId, {
          page: this.page,
          count_on_page: this.perPage
        })
        this.markets = res.data
        
        // Загружаем коэффициенты для каждого маркета
        const arr = Array.isArray(this.markets.data) ? this.markets.data : [];
        for (const m of arr) {
          if (!this.oddForms[m.id]) {
            this.oddForms[m.id] = { value: '' }
          }
        }
        for (const m of arr) {
          await this.loadOdds(m.id)
        }
      } catch (e) {
        this.error = 'Ошибка при загрузке исходов'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },

    async handleAddMarket() {
      if (!this.marketForm.type || !this.marketForm.description) {
        this.error = 'Заполните тип и описание исхода'
        this.$emit('error', this.error)
        return
      }

      this.loadingMarket = true
      try {
        const res = await this.$market.createMarket(this.eventId, { 
          ...this.marketForm,
          participant_id: this.marketForm.participant_id || null
        })
        this.resetMarketForm()
        // Инициализируем oddForms для нового маркета
        const newMarket = res.data?.data ?? res.data
        if (newMarket && newMarket.id) {
          this.oddForms[newMarket.id] = { value: '' }
        }
        await this.loadMarkets()
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при создании исхода'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },

    async handleDeleteMarket(marketId) {
      if (!confirm('Удалить исход?')) return
      this.loadingMarket = true
      try {
        await this.$market.deleteMarket(this.eventId, marketId)
        await this.loadMarkets()
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при удалении исхода'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },

    async loadOdds(marketId) {
      this.loadingOdd = true
      try {
        const res = await this.$odd.fetchOdds(marketId)
        this.oddsByMarket[marketId] = res.data?.data ?? res.data ?? []
        
        // Инициализируем форму для добавления коэффициентов
        this.oddForms[marketId] = this.oddForms[marketId] || { value: '' }
      } catch (e) {
        this.error = 'Ошибка при загрузке коэффициентов'
        this.$emit('error', this.error)
      } finally {
        this.loadingOdd = false
      }
    },

    async handleAddOdd(marketId) {
      const form = this.oddForms[marketId]
      if (!form || !form.value) {
        this.error = 'Введите значение коэффициента'
        this.$emit('error', this.error)
        return
      }

      this.loadingOdd = true
      try {
        await this.$odd.createOdd(marketId, { 
          value: parseFloat(form.value) 
        })
        this.oddForms[marketId].value = ''
        await this.loadOdds(marketId)
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при добавлении коэффициента'
        this.$emit('error', this.error)
      } finally {
        this.loadingOdd = false
      }
    },

    async handleDeleteOdd(marketId, oddId) {
      if (!confirm('Удалить коэффициент?')) return
      this.loadingOdd = true
      try {
        await this.$odd.deleteOdd(marketId, oddId)
        await this.loadOdds(marketId)
        this.$emit('update')
      } catch (e) {
        this.error = 'Ошибка при удалении коэффициента'
        this.$emit('error', this.error)
      } finally {
        this.loadingOdd = false
      }
    },

    updateOddFormLabel(marketId, value) {
      if (!this.oddForms[marketId]) {
        this.oddForms[marketId] = { value: '' }
      }
      this.oddForms[marketId].label = value
    },

    updateOddFormValue(marketId, value) {
      if (!this.oddForms[marketId]) {
        this.oddForms[marketId] = { value: '' }
      }
      this.oddForms[marketId].value = value
    },

    resetMarketForm() {
      this.marketForm = {
        type: '',
        description: '',
        participant_id: null
      }
    },

    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleString('ru-RU')
    },

    nextPage() {
      if (this.markets.next_page_url) {
        this.page++
        this.loadMarkets()
      }
    },

    prevPage() {
      if (this.markets.prev_page_url) {
        this.page--
        this.loadMarkets()
      }
    },

     async loadParticipants() {
      this.loading = true
      try {
        const res = await this.$participant.fetchParticipants(this.eventId, {
          count_on_page: -1
        })
        this.participants = res.data.data
        this.participantOptions = (this.participants || []).map(p => ({ id: p.id, name: p.team?.name ?? `Участник ${p.id}` }))
      } catch (e) {
        this.error = 'Ошибка при загрузке участников'
        this.$emit('error', this.error)
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.loadMarkets()
    this.loadParticipants()
  }
}
</script>