<template>
  <main>
    <WikiSearch :configurations="configurations" :deleteConfiguration="deleteConfiguration" :errorMessage="errorMessage" />
  </main>
</template>

<script>
import WikiSearch from '@/components/configuration/SearchWiki.vue';

export default {
  components: {
    WikiSearch
  },
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