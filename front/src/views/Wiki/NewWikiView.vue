<template>
  <main class="py-12 max-w-screen-lg mx-auto w-full">
    <h1 class="text-2xl text-center">Ajout d’une configuration</h1>
    <ConfigurationForm />
  </main>
</template>

<script>
import ConfigurationForm from '@/components/configuration/ConfigurationForm.vue'

export default {
  components: { ConfigurationForm }
}
</script>
