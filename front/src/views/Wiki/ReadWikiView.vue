<template>
  <main>
    <div v-if="configuration">
      <h1 class="text-center py-14 text-4xl">{{ configuration.name }}</h1>
      <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
        <div>
          <img
            class="max-w-full max-h-full"
            :src="`http://localhost:3000/uploads/${configuration.illustration}`"
            alt="Image de la configuration"
          />
          <div class="flex justify-center gap-8">
            <router-link to="#" class="">
              <button
                class="bg-error px-8 py-2 rounded-sm text-white"
                @click="deleteConfiguration(configuration.id)"
              >
                Supprimer
              </button>
            </router-link>

            <router-link :to="`/wiki/edit/${configuration.id}`" class="">
              <button class="bg-green px-8 py-2 rounded-sm text-white">Modifier</button>
            </router-link>
          </div>
        </div>
        <div class="justify-center ml-24">
          <div class="p-8 bg-blueF text-white my-4">
            <p class="font-bold">Types :</p>
            <p>{{ configuration.type }}</p>
          </div>
          <div class="p-8 bg-blueF text-white my-4">
            <p class="font-bold">Bounding Box :</p>
            <p>{{ configuration.boundingBox }}</p>
          </div>
          <div class="p-8 bg-blueF text-white my-4">
            <p class="font-bold">Nombre de cellules :</p>
            <p>{{ configuration.nbCellules }}</p>
          </div>
          <div class="p-8 bg-blueF text-white my-4">
            <p class="font-bold">Période :</p>
            <p>{{ configuration.periode }}</p>
          </div>
          <div class="p-8 bg-blueF text-white my-4">
            <p class="font-bold">Vitesse :</p>
            <p>{{ configuration.speed }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      configuration: [],
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchConfiguration()
  },
  methods: {
    fetchConfiguration() {
      const id = this.$route.params.id
      fetch(`http://127.0.0.1:3000/wiki/${id}`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`)
            throw new Error('Erreur lors de la récupération de la configuration')
          }
          return response.json()
        })
        .then((data) => {
          this.configuration = data
        })
        .catch((error) => {
          console.error('Erreur de fetch:', error)
          this.errorMessage =
            'Échec de la récupération de la configuration. Veuillez vérifier le serveur et le réseau.'
        })
    },
    deleteConfiguration(id) {
      fetch(`http://127.0.0.1:3000/wiki/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`)
            throw new Error('Erreur lors de la suppression de la configuration')
          }
          this.fetchConfiguration()
        })
        .catch((error) => {
          console.error('Erreur de suppression:', error)
          this.errorMessage = 'Échec de la suppression de la configuration. Veuillez réessayer.'
        })
    }
  }
}
</script>
