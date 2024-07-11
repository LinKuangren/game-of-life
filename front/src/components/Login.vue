<template>
  <div>
    <form v-on:submit.prevent="Login" class="form">
      <label>Nom</label>
      <input type="text" v-model="name" required>
      <label>Mot de passe</label>
      <input type="password" v-model="password" required>
      <button class="gdc-2 gdc-color-2" type="submit">Envoyer</button>
    </form>
    <p v-if="message" :class="{'success': success, 'error': !success}">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      message: "",
      success: false
    };
  },
  methods: {
    async Login() {
      try {
        const response = await fetch("http://127.0.0.1:3000/user/login", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            password: this.password,
          }),
        });

        if (response.ok) {
          const login = await response.json();
          this.message = 'Connecté : ' + login.message;
          this.success = true;
        } else {
          const error = await response.json();
          this.message = 'Erreur : ' + error.error;
          this.success = false;
        }
      } catch (error) {
        this.message = 'Erreur de connexion';
        this.success = false;
      }
    },
  },
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