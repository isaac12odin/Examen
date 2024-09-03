<template>
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">Examen Isaac</h2>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="username">Correo</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Introduce tu correo"
              required
            />
          </div>
          <div class="form-group password-group">
            <label for="password">Contraseña</label>
            <div class="password-container">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Introduce tu contraseña"
                required
              />
              <button type="button" @click="togglePasswordVisibility" class="password-toggle">
                <span v-if="showPassword">🙉</span>
                <span v-else>🙈</span>
              </button>
            </div>
          </div>
          <button type="submit" class="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const router = useRouter();
  
  async function login() {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        Correo: username.value,
        Contrasena: password.value
      });
  
      const { token, id } = response.data;
  
      if (token && id) {
        // Guarda el token en el sessionStorage
        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('userId', id);
  
        // Redirige al usuario al CRUD
        router.push('/crud');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  }
  
  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }
  </script>
  
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f5f5 0%, #e3e3e3 100%);
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: white;
    text-align: center;
  }
  
  .login-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .password-group {
    position: relative;
  }
  
  .password-container {
    display: flex;
    align-items: center;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 70%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  </style>
  