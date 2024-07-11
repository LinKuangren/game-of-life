<template>
    <form v-on:submit="Login" action="http://localhost:5173/" class="form">
        <label>Nom</label>
        <input type="text" v-model="name" required>
        <label>Mot de passe</label>
        <input type="password" v-model="password" required>
        <button class="gdc-2 gdc-color-2">Envoyer</button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async Login() {
      const response = await fetch("http://127.0.0.1:3000/login", {
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
      console.log(response);
      if (response.ok) {
        const login = await response.json();
        console.log('Connecté', login);
      }
    },
  },
};
</script>