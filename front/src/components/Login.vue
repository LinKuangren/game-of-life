<template>
  <div class="w-full max-w-screen-lg m-auto px-8 py-12 self-center">
    <h1 class="text-center font-bold text-2xl">Se connecter</h1>
    <form v-on:submit.prevent="newLogin" class="flex flex-col gap-4 mt-16">
      <label class="flex flex-col gap-2 text-lg">
        Nom
        <input-perso type="text" v-model="name" :required="true" />
      </label>
      <label class="flex flex-col gap-2">
        Mot de passe
        <input-perso type="password" v-model="password" :required="true" />
      </label>
      <button class="bg-green w-full py-3 mt-4" type="submit">Connexion</button>
    </form>
    <AlertBox v-if="alertVisible" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script>
import axios from 'axios';
import AlertBox from '@/components/utils/AlertBox.vue';
import InputPerso from '../components/ui/InputPerso.vue'

export default {
  components: {
    AlertBox,
    InputPerso,
  },
  data() {
    return {
      name: "",
      password: "",
      alertVisible: false,
      alertMessage: '',
      alertType: 'success',
      success: false
    }
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
