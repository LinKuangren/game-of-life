import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WikiView from '../views/Wiki/WikiView.vue'
import NewWikiView from '../views/Wiki/NewWikiView.vue'
import EditWikiView from '../views/Wiki/EditWikiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: WikiView
    },
    {
      path: '/wiki/new-configuration',
      name: 'new-wiki',
      component: NewWikiView
    },
    {
      path: '/wiki/edit/:id',
      name: 'edit-wiki',
      component: EditWikiView
    }
  ]
})

export default router
