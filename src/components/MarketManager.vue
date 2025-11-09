<template>
  <section class="mt-8">
    <h2 class="text-xl font-semibold mb-3">Маркет и коэффициенты</h2>

    <div class="mb-4 max-w-md">
      <label class="block mb-1 font-medium">Добавить маркет</label>
      <div class="flex gap-2">
        <BaseInput 
          v-model="marketForm.name" 
          placeholder="Название маркета" 
        />
        <BaseButton 
          @click="handleAddMarket" 
          :disabled="loadingMarket"
        >
          Добавить
        </BaseButton>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="m in markets" :key="m.id" class="p-4 border rounded">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold">
              {{ m.name }} 
              <span class="text-sm text-gray-500">(id: {{ m.id }})</span>
            </h3>
            <div class="text-sm text-gray-600">Тип: {{ m.type ?? '-' }}</div>
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

        <!-- Odds list and add form -->
        <div class="mt-3">
          <label class="block mb-1 font-medium">Добавить коэффициент</label>
          <div class="flex gap-2 mb-3">
            <BaseInput 
              v-model="oddForms[m.id].label" 
              placeholder="Label" 
            />
            <BaseInput 
              v-model="oddForms[m.id].value" 
              placeholder="Value" 
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
            <h4 class="font-medium mb-1">История коэффициентов</h4>
            <ul class="space-y-1">
              <li 
                v-for="odd in oddsByMarket[m.id] || []" 
                :key="odd.id" 
                class="flex justify-between items-center"
              >
                <div>
                  <div class="font-medium">{{ odd.label }} — {{ odd.value }}</div>
                  <div class="text-sm text-gray-500">
                    {{ odd.created_at ?? odd.updated_at ?? '' }}
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
  </section>
</template>

<script>
import { useMarketStore } from '@/stores/marketStore.js'
import { useOddStore } from '@/stores/oddStore.js'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

export default {
  name: 'MarketManager',
  components: {
    BaseButton,
    BaseInput
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
        name: ''
      },
      oddForms: {},
      markets: [],
      oddsByMarket: {},
      loadingMarket: false,
      loadingOdd: false,
      error: ''
    }
  },
  watch: {
    eventId: {
      handler() {
        this.loadMarkets()
      },
      immediate: true
    },
    markets: {
      handler(newMarkets) {
        newMarkets.forEach(m => {
          if (!this.oddForms[m.id]) {
            this.oddForms[m.id] = { label: '', value: '' }
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async loadMarkets() {
      this.loadingMarket = true
      try {
        const store = useMarketStore()
        const res = await store.fetchMarkets(this.eventId)
        this.markets = res.data?.data ?? res.data ?? []
        // odds for each market
        for (const m of this.markets) {
          await this.loadOdds(m.id)
        }
      } catch (e) {
        this.error = 'Ошибка при загрузке маркетов'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },
    async handleAddMarket() {
      if (!this.marketForm.name) {
        this.error = 'Введите название маркета'
        this.$emit('error', this.error)
        return
      }
      this.loadingMarket = true
      try {
        const store = useMarketStore()
        await store.createMarket(this.eventId, { ...this.marketForm })
        this.marketForm.name = ''
        await this.loadMarkets()
      } catch (e) {
        this.error = 'Ошибка при создании маркета'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },
    async handleDeleteMarket(marketId) {
      if (!confirm('Удалить маркет?')) return
      this.loadingMarket = true
      try {
        const store = useMarketStore()
        await store.deleteMarket(this.eventId, marketId)
        await this.loadMarkets()
      } catch (e) {
        this.error = 'Ошибка при удалении маркета'
        this.$emit('error', this.error)
      } finally {
        this.loadingMarket = false
      }
    },
    async loadOdds(marketId) {
      this.loadingOdd = true
      try {
        const store = useOddStore()
        const res = await store.fetchOdds(marketId)
        this.oddsByMarket[marketId] = res.data?.data ?? res.data ?? []
      } catch (e) {
        this.error = 'Ошибка при загрузке коэффициентов'
        this.$emit('error', this.error)
      } finally {
        this.loadingOdd = false
      }
    },
    async handleAddOdd(marketId) {
      const form = this.oddForms[marketId]
      if (!form || !form.label || !form.value) {
        this.error = 'Заполните все поля коэффициента'
        this.$emit('error', this.error)
        return
      }
      this.loadingOdd = true
      try {
        const store = useOddStore()
        await store.createOdd(marketId, { label: form.label, value: parseFloat(form.value) })
        this.oddForms[marketId].label = ''
        this.oddForms[marketId].value = ''
        await this.loadOdds(marketId)
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
        const store = useOddStore()
        await store.deleteOdd(marketId, oddId)
        await this.loadOdds(marketId)
      } catch (e) {
        this.error = 'Ошибка при удалении коэффициента'
        this.$emit('error', this.error)
      } finally {
        this.loadingOdd = false
      }
    }
  }
}
</script>
