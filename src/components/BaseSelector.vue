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
        class="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
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
            :key="item[valueField]"
            @click="select(item)"
            class="p-2 hover:bg-blue-100 cursor-pointer"
        >
          {{ item[labelField] }}
        </li>

        <li v-if="!filteredItems.length" class="text-center py-2 text-gray-500">
          Ничего не найдено
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSelector",
  props: {
    modelValue: [String, Number, Object],
    items: { type: Array, default: () => [] },
    placeholder: { type: String, default: "Выберите..." },
    valueField: { type: String, default: "id" },
    labelField: { type: String, default: "name" },
  },
  data() {
    return {
      isOpen: false,
      search: "",
    };
  },
  computed: {
    selectedLabel() {
      const val = this.modelValue;
      if (!val) return null;

      const found = this.items.find(
          i => i[this.valueField] === val
      );
      return found ? found[this.labelField] : null;
    },
    filteredItems() {
      return this.items.filter(i =>
          String(i[this.labelField])
              .toLowerCase()
              .includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    select(item) {
      this.$emit("update:modelValue", item[this.valueField]);
      this.isOpen = false;
    },
    onClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  }
};
</script>

