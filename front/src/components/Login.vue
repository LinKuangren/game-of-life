<template>
  <div class="w-full max-w-screen-lg m-auto px-8 py-12 self-center">
    <h1 class="text-center font-bold text-2xl">Se connecter</h1>
    <form v-on:submit.prevent="Login" class="flex flex-col gap-4 mt-16">
      <label class="flex flex-col gap-2 text-lg"
        >Nom
        <input-perso type="text" v-model="name" :required="true" />
      </label>
      <label class="flex flex-col gap-2"
        >Mot de passe
        <input-perso type="password" v-model="password" :required="true" />
      </label>
      <button class="bg-green w-full py-3 mt-4" type="submit">Connexion</button>
    </form>
    <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
  </div>
</template>

<script>
import InputPerso from '../components/ui/InputPerso.vue'

export default {
  components: { InputPerso },
  data() {
    return {
      name: '',
      password: '',
      message: '',
      success: false
    }
  },
  methods: {
    async Login() {
      try {
        const response = await fetch('http://127.0.0.1:3000/user/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            password: this.password
          })
        })

        if (response.ok) {
          const login = await response.json()
          this.message = 'Connecté : ' + login.message
          this.success = true
        } else {
          const error = await response.json()
          this.message = 'Erreur : ' + error.error
          this.success = false
        }
      } catch (error) {
        this.message = 'Erreur de connexion'
        this.success = false
      }
    }
  }
}
</script>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
