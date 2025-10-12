<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
    <div class="w-full max-w-md p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
