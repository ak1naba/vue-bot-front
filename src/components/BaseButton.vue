<template>
  <button
    type="submit"
    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded shadow-md hover:shadow-lg transition"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>
