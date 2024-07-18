<template>
  <div class="max-w-screen-xl mx-auto py-12 h-full">
    <div class="flex gap-4">
      <input
        class="block w-full p-3 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        v-model="search"
        placeholder="Rechercher des configurations..."
      />
    </div>
    <div class="flex justify-between items-center my-8">
      <h1 class="font-bold text-2xl underline my-8">Listes des structures</h1>

      <div class="cta-create min-w-fit">
        <router-link to="/wiki/new-configuration">
          <button class="bg-green p-4 hover:bg-blueF text-white flex gap-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            Créer une configuration
          </button>
        </router-link>
      </div>
    </div>
    <div class="" v-if="search && !filteredConfigurations.length">
      <p>Aucun résultat trouvé!</p>
    </div>
    <ul class="grid lg:grid-cols-3 gap-12 sm:grid-cols-2">
      <li
        v-for="configuration in filteredConfigurations"
        :key="configuration.id"
        class="bg-slate-50 shadow-sm rounded-lg"
      >
        <router-link class="flex flex-col gap-8" :to="`/wiki/${configuration.id}`">
          <img
            class="max-w-xs max-h-[250px] object-contain m-auto"
            :src="`http://localhost:3000/uploads/${configuration.illustration}`"
            alt="Image de la configuration"
          />
          <h2 class="bg-blueF text-white text-center p-4 rounded-lg hover:bg-dark">{{ configuration.name }}</h2>
        </router-link>
        <div class="flex justify-center gap-8">
          <button class="bg-error px-8 py-2 rounded-sm text-white hover:bg-error_hover" @click="showDeletePopover(configuration.id)">
            Supprimer
          </button>
          <router-link :to="`/wiki/edit/${configuration.id}`" class="">
            <button class="bg-green px-8 py-2 rounded-sm text-white hover:bg-green_hover">Modifier</button>
          </router-link>
        </div>
        <div v-if="deletePopoverId === configuration.id" class="popover">
          <p>Êtes-vous sûr de vouloir supprimer cette configuration ?</p>
          <div class="flex justify-center gap-4 mt-4">
            <button class="bg-error px-4 py-2 rounded-sm text-white hover:bg-error_hover" @click="confirmDelete(configuration.id)">
              Supprimer
            </button>
            <button class="bg-gray-200 px-4 py-2 rounded-sm text-gray-900 hover:bg-gray-300" @click="cancelDelete">
              Annuler
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p v-if="errorMessage" class="">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    configurations: {
      type: Array,
      required: true
    },
    errorMessage: {
      type: String,
      default: ''
    },
    deleteConfiguration: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      search: '',
      deletePopoverId: null
    }
  },
  methods: {
    showDeletePopover(configurationId) {
      this.deletePopoverId = configurationId;
    },
    confirmDelete(configurationId) {
      this.deleteConfiguration(configurationId);
      this.deletePopoverId = null;
    },
    cancelDelete() {
      this.deletePopoverId = null;
    }
  },
  computed: {
    filteredConfigurations() {
      return this.configurations.filter((configuration) =>
        configuration.name.toLowerCase().includes(this.search.toLowerCase())
      )
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