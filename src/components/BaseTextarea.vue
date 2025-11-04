<template>
  <textarea
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition resize-none transition"
      :rows="rows"
  ></textarea>
</template>

<script>
export default {
  name: 'BaseTextarea',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
  },
}
</script>
