<template>
  <button
      :type="type"
      :class="buttonClass"
      :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClass() {
      const base =
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-4 py-2 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'

      const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        secondary:
            'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
      }

      return `${base} ${variants[this.variant] || variants.primary}`
    },
  },
}
</script>
