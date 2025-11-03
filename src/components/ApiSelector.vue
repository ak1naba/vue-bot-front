<template>
  <div class="relative w-full">
    <div
        class="w-full p-3 border rounded shadow-sm transition cursor-pointer flex justify-between items-center"
        @click="toggleDropdown"
    >
      <span>{{ selectedLabel || placeholder }}</span>
      <svg class="w-4 h-4" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z"/>
      </svg>
    </div>

    <div
        v-if="isOpen"
        ref="dropdown"
        class="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
        @scroll="onScroll"
    >
      <input
          v-model="search"
          type="text"
          placeholder="Поиск..."
          class="p-2 w-full border-b focus:outline-none text-sm"
      />

      <ul>
        <li
            v-for="item in filteredItems"
            :key="item.id"
            @click="select(item)"
            class="p-2 hover:bg-blue-100 cursor-pointer"
        >
          {{ item[labelField] }}
        </li>

        <li v-if="loading" class="text-center py-2 text-gray-500">
          Загружаю...
        </li>

        <li ref="sentinel" class="h-2"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { privateApiRequest } from "@/api/api.js";

export default {
  name: "ApiSelector",
  props: {
    modelValue: Number,
    placeholder: { type: String, default: "Выберите..." },
    endpoint: { type: String, required: true },
    perPage: { type: Number, default: 10 },
    labelField: { type: String, default: "name" },
  },
  data() {
    return {
      isOpen: false,
      search: "",
      items: [],
      page: 1,
      lastPage: null,
      loading: false,
      observer: null,
    };
  },
  computed: {
    selectedLabel() {
      const found = this.items.find(i => i.id === this.modelValue);
      return found ? found[this.labelField] : null;
    },
    filteredItems() {
      if (!this.search.trim()) return this.items;
      return this.items.filter(i =>
          String(i[this.labelField]).toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        if (!this.items.length) this.load();
        this.$nextTick(() => this.setupObserver());
      } else {
        this.teardownObserver();
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    async load() {
      if (this.loading || (this.lastPage && this.page > this.lastPage)) {
        return;
      }

      this.loading = true;
      try {
        const response = await privateApiRequest.get(this.endpoint, {
          params: {
            page: this.page,
            per_page: this.perPage,
            count_on_page: this.perPage
          }
        });

        const payload = response.data || {};
        const data = payload.data || payload.items || payload.results || [];

        const current_page = payload.current_page ?? payload.page ?? this.page;
        const last_page = payload.last_page ?? payload.lastPage ?? payload.last ?? null;

        this.items.push(...data);
        this.page = Number(current_page) + 1;
        this.lastPage = last_page ? Number(last_page) : null;

        if (data.length === 0 && !this.lastPage) {
          this.lastPage = this.page - 1;
        }
      } catch (e) {
        console.error("ApiSelector load error", e);
      } finally {
        this.loading = false;
      }
    },

    select(item) {
      this.$emit("update:modelValue", item.id);
      this.isOpen = false;
    },

    onScroll(event) {
      const el = event.target;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
        this.load();
      }
    },

    setupObserver() {
      if (!this.$refs.sentinel || this.observer) return;

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.load();
        });
      }, {
        root: this.$refs.dropdown,
        threshold: 0.1
      });

      this.observer.observe(this.$refs.sentinel);
    },

    teardownObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
  },

  beforeDestroy() {
    this.teardownObserver();
  }
};
</script>
