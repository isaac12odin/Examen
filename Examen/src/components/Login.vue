<template>
  <div :class="['d-flex', 'align-items-center', 'justify-content-center', 'min-vh-100', isDarkMode ? 'bg-dark' : 'bg-light']">
    <div class="card p-4 shadow-lg" style="max-width: 400px;">
      <h2 class="card-title mb-4 text-center">Por favor inicia sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Correo</label>
          <input id="username" v-model="username" type="text" placeholder="Introduce tu correo" required class="form-control" />
        </div>
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Contraseña</label>
          <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Introduce tu contraseña" required class="form-control" />
          <button type="button" @click="togglePasswordVisibility" class="btn position-absolute top-50 end-0 translate-middle-y">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
      </form>
      <div class="theme-toggle mt-3 d-flex align-items-center">
        <span>{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isDarkMode = ref(false);
const router = useRouter();

const login = async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/login', { Correo: username.value, Contrasena: password.value });
    if (data.token) {
      sessionStorage.setItem('jwt', data.token);
      sessionStorage.setItem('userId', data.id);
      router.push('/crud');
    }
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
  }
};

const togglePasswordVisibility = () => showPassword.value = !showPassword.value;

onMounted(() => {
  if (sessionStorage.getItem('jwt')) router.push('/crud');
});
</script>

<style scoped>
.card { border-radius: 10px; background: var(--card-bg); transition: transform 0.3s; }
.card:hover { transform: scale(1.03); }
.form-control { border-radius: 8px; border-color: var(--input-border); color: var(--input-text); background: var(--input-bg); padding: 1rem; }
.btn-primary { background-color: var(--primary); border-color: var(--primary); transition: background-color 0.3s; }
.btn-primary:hover { background-color: var(--primary-dark); border-color: var(--primary-dark); }
.toggle-password-btn i { color: var(--icon-color); }
.theme-toggle span { margin-right: 0.75rem; font-size: 1rem; color: var(--icon-color); }
.switch { position: relative; display: inline-block; width: 60px; height: 34px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--input-border); transition: .4s; border-radius: 34px; }
.slider:before { position: absolute; content: ""; height: 26px; width: 26px; border-radius: 50%; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
input:checked + .slider { background-color: var(--primary); }
input:checked + .slider:before { transform: translateX(26px); }
.bg-light { --card-bg: #ffffff; --input-border: #d1dace; --input-bg: #ffffff; --input-text: #000000; --icon-color: #000000; --primary: #46f171; --primary-dark: #000000; }
.bg-dark { --card-bg: #4876a5; --input-border: #ffffff; --input-bg: #ffffff; --input-text: #000000; --icon-color: #ffffff; --primary: #092c61; --primary-dark: #0b5ed7; }
</style>
