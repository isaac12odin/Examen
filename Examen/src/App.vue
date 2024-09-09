<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <header>
    
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Definir estado para el modo oscuro
const isDarkMode = ref(false);

// Cargar la preferencia del usuario desde el almacenamiento local
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode) {
    isDarkMode.value = JSON.parse(savedMode);
    document.body.classList.toggle('dark-mode', isDarkMode.value);
  }
});

// Alternar el modo oscuro y guardar la preferencia en el almacenamiento local
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
  document.body.classList.toggle('dark-mode', isDarkMode.value);
};
</script>

<style>
/* Estilos para el modo oscuro */
.dark-mode {
  background-color: #121212; /* Fondo oscuro */
  color: #e0e0e0; /* Texto claro */
}

.dark-mode header {
  background-color: #1f1f1f; /* Fondo del header en modo oscuro */
}

.dark-mode input[type="checkbox"] {
  accent-color: #ffffff; /* Color del interruptor en modo oscuro */
}

/* Otros estilos oscuros según sea necesario */
</style>
