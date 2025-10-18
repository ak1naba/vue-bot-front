<template>
  <div
      v-if="message"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
  >
    <strong class="font-bold">Ошибка: </strong>
    <span class="block sm:inline">{{ message }}</span>
    <button
        type="button"
        @click="$emit('close')"
        class="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700"
    >
      ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
