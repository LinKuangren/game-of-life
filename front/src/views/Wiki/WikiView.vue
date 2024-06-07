<template>
  <main>
    <h1>Wiki</h1>
    <div class="cta-create">
      <router-link to="/wiki/new-configuration">
        <button class="gdc-2 gdc-color-2">Créer une configuration</button>
      </router-link>
    </div>
    <ul>
      <li v-for="configuration in configurations" :key="configuration.id">
        <h2>{{ configuration.name }}</h2>
        <p>{{ configuration.illustration }}</p>
        <p>{{ configuration.type }}</p>
        <p>{{ configuration.boundingBox }}</p>
        <p>{{ configuration.nbCellules }}</p>
        <p>{{ configuration.periode }}</p>
        <p>{{ configuration.speed }}</p>
        <div class="del-put">
          <button class="gdc-2 gdc-color-1" @click="deleteConfiguration(configuration.id)">Supprimer</button>
          <router-link :to="`/wiki/edit/${configuration.id}`" class="cta-edit">
            <button class="gdc-2 gdc-color-2">Modifier</button>
          </router-link>
        </div>
      </li>
    </ul>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      configurations: [],
      errorMessage: '',
    };
  },
  mounted() {
    this.fetchConfigurations();
  },
  methods: {
    fetchConfigurations() {
      fetch('http://127.0.0.1:3000/wiki')
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`);
            throw new Error('Erreur lors de la récupération des configurations');
          }
          return response.json();
        })
        .then((data) => {
          this.configurations = data;
        })
        .catch((error) => {
          console.error('Erreur de fetch:', error);
          this.errorMessage = 'Échec de la récupération des configurations. Veuillez vérifier le serveur et le réseau.';
        });
    },
    deleteConfiguration(id) {
      fetch(`http://127.0.0.1:3000/wiki/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`);
            throw new Error('Erreur lors de la suppression de la configuration');
          }
          this.fetchConfigurations();
        })
        .catch((error) => {
          console.error('Erreur de suppression:', error);
          this.errorMessage = 'Échec de la suppression de la configuration. Veuillez réessayer.';
        });
    }
  }
};
</script>
