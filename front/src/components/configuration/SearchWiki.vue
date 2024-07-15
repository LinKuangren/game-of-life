<template>
  <div>
    <div>
      <input class="block w-full p-3 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" type="text" v-model="search" placeholder="Rechercher des configurations..." />
    </div>
    <div class="flex">
      <h1 class="font-bold underline">Listes des structures</h1>
      <div class="cta-create">
        <router-link to="/wiki/new-configuration">
          <button class="bg-green p-4 hover:bg-blueF text-white">Créer une configuration</button>
        </router-link>
      </div>
    </div>
    <div class="" v-if="search && !filteredConfigurations.length">
      <p>Aucun résultat trouvé!</p>
    </div>
    <ul>
      <!-- <p>Configurations: {{ configurations }}</p> -->
      <li v-for="configuration in filteredConfigurations" :key="configuration.id">
        <article class="text-center">
          <img :src="`http://localhost:3000/uploads/${configuration.illustration}`" alt="Image de la configuration"/>
          <router-link :to="`/wiki/${configuration.id}`">
            <h2 class="bg-blueF text-white p-4">{{ configuration.name }}</h2>
          </router-link>
          <div class="flex justify-center">
            <button class="bg-blueF text-white hover:bg-green hover:text-white" @click="deleteConfiguration(configuration.id)">Supprimer</button>
            <router-link :to="`/wiki/edit/${configuration.id}`" class="">
              <button class="bg-green hover:bg-blueF hover:text-white">Modifier</button>
            </router-link>
          </div>
      </article>
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
      search: ''
    };
  },
  computed: {
    filteredConfigurations() {
      return this.configurations.filter(configuration =>
        configuration.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>