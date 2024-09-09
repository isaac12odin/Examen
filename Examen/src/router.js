import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Crud from './components/Crud.vue';
import axios from 'axios';

const routes = [
  { path: '/', component: Login },
  { path: '/crud', component: Crud, meta: { requiresAuth: true } } // Ruta protegida
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Función para verificar el token en el cliente
const isAuthenticated = async () => {
  const token = sessionStorage.getItem('jwt');

  if (!token) return false;

  try {
    const response = await axios.post('http://localhost:3000/api/verify-token', { token });
    return response.status === 200;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
};

// Guardias de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !(await isAuthenticated())) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
    next('/');
  } else {
    // Si no requiere autenticación o el usuario está autenticado, permite la navegación
    next();
  }
});

export default router;
