<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <AgregarCliente @clientAdded="fetchData" />
    <div class="container mt-4">

      <Tabla ref="tabla" />
    </div>
     
    
      
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Tabla from './Tabla.vue'; 
import AgregarCliente from './AgregarCliente.vue'; 

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
