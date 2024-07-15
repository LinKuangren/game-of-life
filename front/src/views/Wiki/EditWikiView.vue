<template>
  <main class="py-12 max-w-screen-lg mx-auto w-full">
    <h1 class="text-2xl text-center">Modifier configuration</h1>
    <EditConfigurationForm />
  </main>
</template>

<script>
import EditConfigurationForm from '@/components/configuration/EditConfigurationForm.vue'

export default {
  components: { EditConfigurationForm }
}
</script>
