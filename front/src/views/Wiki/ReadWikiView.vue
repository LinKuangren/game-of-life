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
            <button class="bg-error px-8 py-2 rounded-sm text-white hover:bg-error_hover" @click="showDeletePopover(configuration.id)">
              Supprimer
            </button>
            <router-link :to="`/wiki/edit/${configuration.id}`" class="">
              <button class="bg-green px-8 py-2 rounded-sm text-white hover:bg-green_hover">Modifier</button>
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
      <div v-if="deletePopoverId === configuration.id" class="popover">
        <p>Êtes-vous sûr de vouloir supprimer cette configuration ?</p>
        <div class="flex justify-center gap-4 mt-4">
          <button class="bg-error px-4 py-2 rounded-sm text-white hover:bg-error_hover" @click="deleteConfiguration(configuration.id)">
            Supprimer
          </button>
          <button class="bg-gray-200 px-4 py-2 rounded-sm text-gray-900 hover:bg-gray-300" @click="cancelDelete">
            Annuler
          </button>
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
      deletePopoverId: null,
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

          this.deletePopoverId = null

          this.$router.push('/wiki')
        })
        .catch((error) => {
          console.error('Erreur de suppression:', error)
          this.errorMessage = 'Échec de la suppression de la configuration. Veuillez réessayer.'
        })
    },
    showDeletePopover(configurationId) {
      this.deletePopoverId = configurationId;
    },
    cancelDelete() {
      this.deletePopoverId = null;
    }
  }
}
</script>

<style scoped>
  .popover {
    position: fixed;
    z-index: 999;
    background-color: white;
    border: 1px solid #ccc;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    left: 35%;
    top: 35%;
  }
</style>
