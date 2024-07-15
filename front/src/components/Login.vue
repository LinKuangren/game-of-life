<template>
  <div>
    <form v-on:submit.prevent="newLogin" class="form">
      <label>Nom</label>
      <input type="text" v-model="name" required>
      <label>Mot de passe</label>
      <input type="password" v-model="password" required>
      <button class="gdc-2 gdc-color-2" type="submit">Envoyer</button>
    </form>
    <AlertBox v-if="alertVisible" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script>
import axios from 'axios';
import AlertBox from '@/components/utils/AlertBox.vue';

export default {
  components: {
    AlertBox,
  },
  data() {
    return {
      name: "",
      password: "",
      alertVisible: false,
      alertMessage: '',
      alertType: 'success',
      success: false
    };
  },
  methods: {
    async newLogin() {
      try {
        const response = await axios.post('http://localhost:3000/user/login', {
          name: this.name,
          password: this.password
        });
        
        const { token, user } = response.data;
        
        // Stockez le token dans le localStorage
        localStorage.setItem('token', token);

        const redirectPath = this.$route.query.redirect || '/wiki'
        this.$router.push(redirectPath)
      } catch (error) {
        console.error('Erreur de connexion:', error);
        // Gérez les erreurs (affichage d'un message à l'utilisateur, etc.)
      }
    },
  }
};
</script>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>