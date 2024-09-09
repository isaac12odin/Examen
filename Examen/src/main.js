import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './style.css'

// Añadir los iconos a la biblioteca
library.add(faSun, faMoon);

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon); // Registrar el componente globalmente
app.mount('#app');
