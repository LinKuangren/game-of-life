import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimulatorView from '../views/SimulatorView.vue'
import WikiView from '../views/Wiki/WikiView.vue'
import NewWikiView from '../views/Wiki/NewWikiView.vue'
import EditWikiView from '../views/Wiki/EditWikiView.vue'
import ReadWikiView from '../views/Wiki/ReadWikiView.vue'
import LoginView from '../views/LoginView.vue'
import AccueilView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil'
      }
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: WikiView,
      meta: {
        title: 'Wiki'
      }
    },
    {
      path: '/simulateur',
      name: 'simulateur',
      component: SimulatorView,
      meta: {
        title: 'Simulateur'
      }
    },
    {
      path: '/wiki/new-configuration',
      name: 'new-wiki',
      component: NewWikiView,
      meta: {
        title: 'New Wiki'
      }
    },
    {
      path: '/wiki/edit/:id',
      name: 'edit-wiki',
      component: EditWikiView,
      meta: {
        title: 'Edit wiki'
      }
    },
    {
      path: '/wiki/:id',
      name: 'read-wiki',
      component: ReadWikiView,
      meta: {
        title: 'Read wiki'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Connexion'
      }
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: AccueilView,
      meta: {
        title: 'Accueil'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vite App'
  next()
})

export default router
