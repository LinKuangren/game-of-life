<template>
  <form v-on:submit.prevent="updateConfiguration" class="form">
    <label>Nom</label>
    <input type="text" v-model="name" required>
    <label>Illustration</label>
    <!--<input type="file" accept="image/*" ref="file" @change="upload()" required />-->
    <label>Type</label>
    <select name="type" id="type" v-model="type" required>
        <option value="Vaisseau">Vaisseau</option>
        <option value="autre">Autre</option>
    </select>
    <label>BoundingBox</label>
    <input type="text" v-model="boundingBox" required>
    <label>nbCellules</label>
    <input type="number" v-model="nbCellules" required>
    <label>periode</label>
    <input type="number" v-model="periode">
    <label>speed</label>
    <input type="text" v-model="speed">
    <button type="submit" class="gdc-2 gdc-color-2">Envoyer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      illustration: "",
      type: "",
      boundingBox: "",
      nbCellules: "",
      periode: "",
      speed: "",
    };
  },
  created() {
    this.fetchConfiguration();
  },
  methods: {
    fetchConfiguration() {
      fetch(`http://127.0.0.1:3000/wiki/${this.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération de la configuration");
          }
          return response.json();
        })
        .then((data) => {
          this.name = data.name;
          this.illustration = data.illustration;
          this.type = data.type;
          this.boundingBox = data.boundingBox;
          this.nbCellules = data.nbCellules;
          this.periode = data.periode;
          this.speed = data.speed;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateConfiguration() {
      fetch(`http://127.0.0.1:3000/wiki/${this.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          illustration: this.illustration,
          type: this.type,
          boundingBox: this.boundingBox,
          nbCellules: this.nbCellules,
          periode: this.periode,
          speed: this.speed,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la configuration");
          }
          return response.json();
        })
        .then(() => {
          this.$router.push({ name: "wiki" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
