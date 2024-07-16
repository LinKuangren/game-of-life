<template>
  <main class="px-24 py-12">
    <div>
      <h1 class="text-center text-4xl font-bold pb-6">Introduction</h1>
      <p class="pb-4 text-start">
        Le jeu de la vie n'est pas un jeu informatique classique. Il s'agit d'un automate cellulaire
        inventé par le mathématicien de Cambridge, John Conway.
      </p>
      <p>
        Ce jeu est devenu largement connu lorsqu'il a été mentionné dans un article publié par
        Scientific American en 1970. Il consiste en une grille de cellules qui, selon quelques
        règles mathématiques, peuvent vivre, mourir ou se multiplier. En fonction des conditions
        initiales, les cellules forment différents motifs tout au long du jeu.
      </p>
      <span class="block w-full bg-dark h-px my-12"></span>
    </div>
    <div>
      <h1 class="text-center text-4xl font-bold pb-6">Règle</h1>
      <p>
        Il s’agit d’un automate cellulaire où des cellules évoluent sur une grille bidimensionnelle
        à chaque tour selon des règles bien précises.Un cellule peut être dans 2 états : morte ou
        vivante.
      </p>
      <div class="lg:flex items-center justify-center md:grid py-8">
        <img src="../assets/imgHome/grille_1.png" alt="Image" />
        <div class="lg:ml-12">
          <div class="flex items-center">
            <img class="h-4 pr-1" src="../assets/imgHome/blueF.png" alt="Image" />
            <p>Cellules mortes</p>
          </div>
          <div class="flex items-center">
            <img class="h-4 pr-1" src="../assets/imgHome/blueV.png" alt="Image" />
            <p>Cellules vivantes</p>
          </div>
        </div>
      </div>
      <p>
        A partir de cet état initial, notre automate peut commencer à prendre vie à travers un
        enchaînement de générations où nos cellules respectent 3 règles :
      </p>
      <div class="my-14 mx-4">
        <p class="list-item mb-1">
          <strong>Naissance :</strong> si une ⬛ cellule morte est entourée d’exactement 3 🟪
          cellules vivantes, elle prend vie.
        </p>
        <p class="list-item mb-1">
          <strong>Mort :</strong> si une 🟪 cellule vivante est entourée de moins de 2 ou plus de 3
          🟪 cellules vivantes, elle meurt (on parle de sous-population et de surpopulation).
        </p>
        <p class="list-item">
          <strong>Survie :</strong> si une 🟪 cellule vivante est entourée de 2 ou 3 🟪 cellules
          vivantes, elle survit.
        </p>
      </div>
      <p>
        En enchaînant les générations, ce modèle mathématique permet de créer une simulation de la
        vie, avec des pixels. On parle aussi de Vie Artificielle. Voici un exemple illustrant cet
        automate cellulaire, sur plusieurs générations.
      </p>
      <div class="justify-center mt-14 mb-8 lg:flex md:grid">
        <div class="lg:mx-auto md:mx-36">
          <img src="../assets/imgHome/grille_1.png" alt="Image" />
          <small>générations 1</small>
        </div>
        <div class="mx-36">
          <img src="../assets/imgHome/grille_2.png" alt="Image" />
          <small>générations 2</small>
        </div>
        <div class="lg:mx-auto md:mx-36">
          <img src="../assets/imgHome/grille_3.png" alt="Image" />
          <small>générations 3</small>
        </div>
      </div>
      <p>Vous avez compris le principe !</p>
    </div>
    <div class="mt-20">
      <h1 class="text-center text-4xl font-bold pb-6">Dernières création</h1>
      <ul class="grid lg:grid-cols-3 gap-12 md:grid-cols-2">
        <li v-for="configuration in recentConfigurations" :key="configuration.id" class="bg-slate-50 shadow-sm rounded-lg">
          <router-link class="flex flex-col gap-8" :to="`/wiki/${configuration.id}`">
            <img
              class="max-w-xs max-h-[250px] object-contain m-auto"
              :src="`http://localhost:3000/uploads/${configuration.illustration}`"
              alt="Image de la configuration"
            />
            <h2 class="bg-blueF text-white text-center p-4 rounded-lg hover:bg-dark">{{ configuration.name }}</h2>
            <div class="flex justify-center xl:gap-8 lg:gap-4 md:gap-2">
              <router-link to="#" class="">
                <button
                  class="bg-error px-8 py-2 rounded-sm text-white hover:bg-error_hover"
                  @click="deleteConfiguration(configuration.id)"
                >
                  Supprimer
                </button>
              </router-link>
              <router-link :to="`/wiki/edit/${configuration.id}`" class="">
                <button class="bg-green px-8 py-2 rounded-sm text-white hover:bg-green_hover">Modifier</button>
              </router-link>
            </div>
          </router-link>
        </li>
      </ul>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      configurations: [],
      errorMessage: ''
    }
  },
  computed: {
    recentConfigurations() {
      return this.configurations.sort((a, b) => new Date(b.id) - new Date(a.id)).slice(0, 3)
    }
  },
  mounted() {
    this.fetchConfigurations()
  },
  methods: {
    fetchConfigurations() {
      fetch('http://127.0.0.1:3000/wiki')
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`)
            throw new Error('Erreur lors de la récupération des configurations')
          }
          return response.json()
        })
        .then((data) => {
          this.configurations = data
        })
        .catch((error) => {
          console.error('Erreur de fetch:', error)
          this.errorMessage =
            'Échec de la récupération des configurations. Veuillez vérifier le serveur et le réseau.'
        })
    },
    deleteConfiguration(id) {
      fetch(`http://127.0.0.1:3000/wiki/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Erreur HTTP! statut: ${response.status}`)
            throw new Error('Erreur lors de la suppression de la configuration')
          }
          this.fetchConfigurations()
        })
        .catch((error) => {
          console.error('Erreur de suppression:', error)
          this.errorMessage = 'Échec de la suppression de la configuration. Veuillez réessayer.'
        })
    }
  }
}
</script>
