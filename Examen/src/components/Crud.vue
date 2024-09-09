<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <!-- Aquí se incluirá el componente Tabla -->
      <AgregarCliente @clientAdded="fetchData" />
    <div class="container mt-4">

      <Tabla ref="tabla" />
    </div>
     
    
      
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Tabla from './Tabla.vue'; // Asegúrate de que la ruta sea correcta
import AgregarCliente from './AgregarCliente.vue'; // Asegúrate de que la ruta sea correcta

export default {
  components: {
    Navbar,
    Tabla,
    AgregarCliente,
  },
  methods: {
    async fetchData() {
      // Método para recargar los datos después de agregar un cliente
      await this.$refs.tabla.fetchItems();
    }
  }
};
</script>

<style scoped>

</style>
