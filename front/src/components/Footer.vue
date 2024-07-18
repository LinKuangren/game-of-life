<template>
  <footer class="bg-blueF text-white py-1 h-fit">
    <div>
      <nav class="flex font-bold justify-center my-4">
        <router-link to="/" class="my-0 mx-2">Accueil</router-link>
        <router-link to="/wiki" class="my-0 mx-2">Wiki</router-link>
        <router-link to="/" class="my-0 mx-2">Simulateur</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="my-0 mx-2">Se connecter</router-link>
        <button v-else @click="logout()" class="my-0 mx-2">Déconnexion</button>
      </nav>
    </div>
    <div class="flex justify-center">
      <router-link to="/"
        ><img
          alt="logo_simweb"
          class="justify-center"
          src="@/assets/logo.png"
          width="125"
          height="125"
      /></router-link>
    </div>
  </footer>
</template>

<script>
import { isAuthenticated } from '@/utils/auth.js';

export default {
  data() {
    return {
      isLoggedIn: isAuthenticated()
    };
  },
  created() {
    this.isLoggedIn = isAuthenticated();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      this.isLoggedIn = isAuthenticated();
    }
  }
};
</script>
