<template>
    <form v-on:submit="createConfiguration" action="http://localhost:5173/wiki" class="form">
        <label>Nom</label>
        <input type="text" v-model="name" required>
        <label>Illustration</label>
        <!--<input
            type="file"
            accept="image/*"
            ref="file"
            @change="upload()"
            required
        />-->
        <label>Type</label>
        <select name="type" id="type" v-model="type" required>
          <option value="Vaisseau">Vaisseau</option>
          <option value="autre">Autre</option>
        </select>
        <label>BoundingBox</label>
        <input type="text" v-model="boundingBox" required>
        <label>nbCellules</label>
        <input type="int" v-model="nbCellules" required>
        <label>periode</label>
        <input type="int" v-model="periode" required>
        <label>speed</label>
        <input type="text" v-model="speed" required>
        <button class="gdc-2 gdc-color-2">Envoyer</button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      illustration: "test",
      //illustration: undefined,
      type: "",
      boundingBox: "",
      nbCellules: "",
      periode: "",
      speed: "",
    };
  },
  methods: {
    async createConfiguration() {
      const response = await fetch("http://127.0.0.1:3000/wiki/new-configuration", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          illustration: this.illustration,
          type: this.type,
          boundingBox: this.boundingBox,
          nbCellules: Number(this.nbCellules),
          periode: Number (this.periode),
          speed: this.speed,
        }),
      });
      console.log(response);
      if (response.ok) {
        const configuration = await response.json();
        console.log('Configuration ajoutée :', configuration);
      }
    },
  },
};
</script>