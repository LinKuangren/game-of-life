import './assets/main.css'
import './assets/variable.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import axios from 'axios';

// Configurez l'intercepteur
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Navigation', Navigation)
app.component('Footer', Footer)
app.mount('#app')
