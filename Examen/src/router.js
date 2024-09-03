import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Crud from './components/Crud.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/crud', component: Crud, meta: { requiresAuth: true } } // Ruta protegida
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Función para verificar el token en el backend
const verifyToken = async (token) => {
  try {
    const response = await fetch('/api/verifyToken', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      return true; // Token válido
    } else {
      return false; // Token no válido
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
};

// Guardias de navegación
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = to.matched.some(record => record.meta.requiresAuth);

  if (isAuthenticated) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwt');

    if (userId && token) {
      // Espera la verificación del token antes de permitir el acceso
      const isValidToken = await verifyToken(token);
      if (isValidToken) {
        next(); // Permite la navegación
      } else {
        // El token no es válido, redirige al login
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        next('/'); // Redirige al login
      }
    } else {
      // No hay userId o token, redirige al login
      next('/');
    }
  } else {
    // Ruta no protegida, permite la navegación
    next();
  }
});

export default router;
