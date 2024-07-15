<script setup>
const props = defineProps(['type'])
</script>

<template>
  <button v-if="props.type === 'alert'" class="bg-error px-8 py-2 rounded-sm">
    <slot />
  </button>

  <button v-else-if="props.type === 'neutral'" class="bg-dark px-8 py-2 rounded-sm text-white">
    <slot />
  </button>

  <button v-else class="bg-green px-8 py-2 rounded-sm">
    <slot />
  </button>
</template>
