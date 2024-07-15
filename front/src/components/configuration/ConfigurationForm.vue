<template>
  <form
    v-on:submit="createConfiguration"
    action="http://localhost:5173/wiki"
    class="flex flex-col gap-4 w-full"
    enctype="multipart/form-data"
  >
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
    <button class="bg-green w-full py-3 mt-4">Créer</button>
  </form>
</template>

<script>
import InputPerso from '../ui/InputPerso.vue'

export default {
  components: { InputPerso },
  data() {
    return {
      name: '',
      illustration: null,
      type: '',
      boundingBox: '',
      nbCellules: '',
      periode: '',
      speed: ''
    }
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
    async createConfiguration(event) {
      event.preventDefault()

      const response = await fetch('http://127.0.0.1:3000/wiki/new-configuration', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          illustration: this.illustration,
          type: this.type,
          boundingBox: this.boundingBox,
          nbCellules: Number(this.nbCellules),
          periode: Number(this.periode),
          speed: this.speed
        })
      })

      if (response.ok) {
        const configuration = await response.json()
        console.log('Configuration ajoutée :', configuration)
        this.$router.push('/wiki')
      } else {
        console.error('Erreur lors de la création de la configuration')
      }
    }
  }
}
</script>
