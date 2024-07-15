<template>
  <form v-on:submit.prevent="updateConfiguration" class="flex flex-col gap-4 w-full">
    <label class="flex flex-col w-full"
      >Nom
      <InputPerso type="text" v-model="name" required="true" />
    </label>
    <label class="flex flex-col w-full"
      >Illustration
      <input type="file" accept="image/*" ref="file" @change="upload" required />
    </label>
    <label class="flex flex-col w-full"
      >Type
      <select
        class="border-2 border-black border-solid text-lg px-4 py-2"
        name="type"
        id="type"
        v-model="type"
        required
      >
        <option value="Vaisseau">Vaisseau</option>
        <option value="autre">Autre</option>
      </select>
    </label>
    <label class="flex flex-col w-full"
      >BoundingBox
      <InputPerso type="text" v-model="boundingBox" required="true" />
    </label>
    <label class="flex flex-col w-full"
      >nbCellules
      <InputPerso type="number" v-model="nbCellules" required="true" />
    </label>
    <label class="flex flex-col w-full"
      >periode
      <InputPerso type="number" v-model="periode" />
    </label>
    <label class="flex flex-col w-full"
      >speed
      <InputPerso type="text" v-model="speed" />
    </label>
    <button class="bg-green w-full py-3 mt-4">Modifier</button>
  </form>
</template>

<script>
import InputPerso from '../ui/InputPerso.vue'

export default {
  components: { InputPerso },
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      illustration: '',
      type: '',
      boundingBox: '',
      nbCellules: '',
      periode: '',
      speed: ''
    }
  },
  created() {
    this.fetchConfiguration()
  },
  methods: {
    async upload(event) {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('http://127.0.0.1:3000/wiki/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          this.illustration = result.filePath
        }
      }
    },
    fetchConfiguration() {
      fetch(`http://127.0.0.1:3000/wiki/${this.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la configuration')
          }
          return response.json()
        })
        .then((data) => {
          this.name = data.name
          this.illustration = data.illustration
          this.type = data.type
          this.boundingBox = data.boundingBox
          this.nbCellules = data.nbCellules
          this.periode = data.periode
          this.speed = data.speed
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateConfiguration(event) {
      event.preventDefault()

      fetch(`http://127.0.0.1:3000/wiki/${this.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          illustration: this.illustration,
          type: this.type,
          boundingBox: this.boundingBox,
          nbCellules: this.nbCellules,
          periode: this.periode,
          speed: this.speed
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la configuration')
          }
          return response.json()
        })
        .then(() => {
          this.$router.push({ name: 'wiki' })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
