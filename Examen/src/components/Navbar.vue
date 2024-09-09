<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid">
        <router-link class="navbar-brand">
          <img src="../assets/descarga.png" alt="Logo" class="navbar-logo" />
          Admin
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">

            <li class="nav-item">
              <button class="btn btn-outline-light logout-btn" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
 <script>
import axios from 'axios';

export default {
  methods: {
    async logout() {
      const token = sessionStorage.getItem('jwt'); // Obtén el token de sessionStorage

      if (token) {
        try {
          const response = await axios.post('http://localhost:3000/api/logout', {}, {
            headers: {
              'Authorization': `Bearer ${token}` // Usa el header Authorization para enviar el token
            }
          });

          if (response.status === 200) {
            sessionStorage.removeItem('jwt'); // Elimina el token de sessionStorage
            sessionStorage.removeItem('userid'); // Elimina el ID del usuario si es necesario
            window.location.href = 'http://localhost:5173'; // Redirige a la URL final
          } else {
            alert('Error al cerrar sesión');
          }
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          alert('Error al cerrar sesión');
        }
      } else {
        // Si no hay token, redirige inmediatamente
        window.location.href = 'http://localhost:5173';
      }
    },
  },
};

</script>
  
  
  <style scoped>
  /* Estilo personalizado para la barra de navegación */
  .navbar-custom {
    background-color: #343a40;
    padding: 10px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .navbar-brand {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  
  .navbar-logo {
    height: 40px;
    margin-right: 10px;
  }
  
  .nav-link {
    color: #ffffff;
    font-size: 1.2rem;
    margin-right: 15px;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #ffc107;
  }
  
  .logout-btn {
    background-color: transparent;
    border: 2px solid #ffc107;
    border-radius: 20px;
    font-size: 1rem;
    color: #ffc107;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .logout-btn:hover {
    background-color: #ffc107;
    color: #343a40;
  }
  
  .navbar-toggler-icon {
    background-image: url('data:image/svg+xml;charset=utf8,%3Csvg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"/%3E%3C/svg%3E');
  }
  </style>
  