<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: String,
    placeholder: String,
    type: { type: String, default: 'text' },
  },
}
</script>
