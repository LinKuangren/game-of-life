import './assets/main.css'
import './assets/variable.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Navigation', Navigation)
app.component('Footer', Footer)
app.mount('#app')
