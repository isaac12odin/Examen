<template>
    <div class="crud-container">
      <h2>Gestión de clientes</h2>
      <div class="crud-actions">
        <button @click="showAddForm = true" class="crud-button crud-button-add">Agregar cliente</button>
        <button @click="logout" class="crud-button crud-button-logout">Salir</button>
      </div>
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Buscar..." />
      </div>
  
      <!-- Formulario para agregar nuevo cliente -->
      <div v-if="showAddForm" class="add-client-form">
        <h3>Nuevo Cliente</h3>
        <form @submit.prevent="addNewClient">
          <label for="Nombre">Nombre:</label>
          <input v-model="newClient.Nombre" type="text" id="Nombre" required />
          
          <label for="Apellido_Ma">Apellido Materno:</label>
          <input v-model="newClient.Apellido_Ma" type="text" id="Apellido_Ma" required />
          
          <label for="Apellido_Pa">Apellido Paterno:</label>
          <input v-model="newClient.Apellido_Pa" type="text" id="Apellido_Pa" required />
          
          <label for="Domicilio">Domicilio:</label>
          <input v-model="newClient.Domicilio" type="text" id="Domicilio" required />
          
          <label for="Correo">Correo:</label>
          <input v-model="newClient.Correo" type="email" id="Correo" required />
          
          <div class="form-actions">
            <button type="submit" class="crud-button crud-button-add">Aceptar</button>
            <button type="button" @click="cancelAdd" class="crud-button crud-button-cancel">Cancelar</button>
          </div>
        </form>
      </div>
  
      <!-- Formulario para editar cliente -->
      <div v-if="showEditForm" class="add-client-form">
        <h3>Editar Cliente</h3>
        <form @submit.prevent="updateClient">
          <label for="Nombre">Nombre:</label>
          <input v-model="selectedClient.Nombre" type="text" id="Nombre" required />
          
          <label for="Apellido_Ma">Apellido Materno:</label>
          <input v-model="selectedClient.Apellido_Ma" type="text" id="Apellido_Ma" required />
          
          <label for="Apellido_Pa">Apellido Paterno:</label>
          <input v-model="selectedClient.Apellido_Pa" type="text" id="Apellido_Pa" required />
          
          <label for="Domicilio">Domicilio:</label>
          <input v-model="selectedClient.Domicilio" type="text" id="Domicilio" required />
          
          <label for="Correo">Correo:</label>
          <input v-model="selectedClient.Correo" type="email" id="Correo" required />
          
          <div class="form-actions">
            <button type="submit" class="crud-button crud-button-add">Actualizar</button>
            <button type="button" @click="cancelEdit" class="crud-button crud-button-cancel">Cancelar</button>
          </div>
        </form>
      </div>
  
      <div class="table-wrapper">
        <table class="crud-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Materno</th>
              <th>Apellido Paterno</th>
              <th>Domicilio</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.Nombre || 'No disponible' }}</td>
              <td>{{ item.Apellido_Ma || 'No disponible' }}</td>
              <td>{{ item.Apellido_Pa || 'No disponible' }}</td>
              <td>{{ item.Domicilio || 'No disponible' }}</td>
              <td>{{ item.Correo || 'No disponible' }}</td>
              <td class="actions">
                <button @click="editItem(item)" class="crud-button crud-button-edit">Editar</button>
                <button @click="deleteItem(item.id)" class="crud-button crud-button-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const items = ref([]);
  const showAddForm = ref(false);
  const showEditForm = ref(false);
  const searchQuery = ref('');
  const newClient = ref({
    Nombre: '',
    Apellido_Ma: '',
    Apellido_Pa: '',
    Domicilio: '',
    Correo: ''
  });
  
  const selectedClient = ref({});
  
  const apiUrl = 'http://localhost:3000/api/clientes'; 
  
  const fetchClients = async () => {
    try {
      const response = await axios.get(apiUrl);
      items.value = response.data;
      console.log('Clientes obtenidos:', items.value); 
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };
  
  const addNewClient = async () => {
    try {
      const response = await axios.post(apiUrl, newClient.value);
      items.value.push(response.data);
      resetForm();
      showAddForm.value = false;
    } catch (error) {
      console.error('Error al agregar el cliente:', error.response?.data || error.message);
    }
  };
  
  const editItem = (item) => {
    selectedClient.value = { ...item }; // Copia el cliente para editar
    showEditForm.value = true;
    showAddForm.value = false; // Oculta el formulario de agregar
  };
  
  const updateClient = async () => {
    try {
      const response = await axios.put(`${apiUrl}/${selectedClient.value.id}`, selectedClient.value);
      const index = items.value.findIndex(item => item.id === selectedClient.value.id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      resetForm();
      showEditForm.value = false;
    } catch (error) {
      console.error('Error al actualizar el cliente:', error.response?.data || error.message);
    }
  };
  

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      items.value = items.value.filter(item => item.id !== id);
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };
  
  const cancelAdd = () => {
    resetForm();
    showAddForm.value = false;
  };
  
  const cancelEdit = () => {
    resetForm();
    showEditForm.value = false;
  };
  
  const resetForm = () => {
    newClient.value = {
      Nombre: '',
      Apellido_Ma: '',
      Apellido_Pa: '',
      Domicilio: '',
      Correo: ''
    };
    selectedClient.value = {};
  };
  const logout = async () => {
  try {
    // Obtén el token del sessionStorage
    const token = sessionStorage.getItem('jwt');

    // Envía una solicitud al servidor para eliminar el token de la base de datos
    const response = await axios.post('http://localhost:3000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}` // Asegúrate de que el token esté en el encabezado Authorization
      }
    });

    // Verifica si la respuesta indica éxito
    if (response.status === 200 && response.data.mensaje === 'Sesión cerrada correctamente') {
      // Elimina el token del sessionStorage
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('userId');

      // Redirige a la página de inicio de sesión
      window.location.href = '/';
    } else {
      console.error('Error al cerrar sesión:', response.data.mensaje);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

  
  const filteredItems = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return items.value.filter(item => 
      Object.values(item).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );
  });
  
  onMounted(() => {
    fetchClients();
  });
  </script>

  
  
  <style scoped>
  .crud-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .crud-actions {
    margin-bottom: 15px;
    text-align: right;
  }
  
  .search-bar {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .search-bar input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
  }
  
  .crud-button {
    background-color: #12AB35;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 5px;
    transition: background-color 0.3s;
  }
  
  .crud-button-add {
    background-color: #28a745;
  }
  
  .crud-button-add:hover {
    background-color: #218838;
  }
  
  .crud-button-edit {
    background-color: #007bff;
  }
  
  .crud-button-edit:hover {
    background-color: #0056b3;
  }
  
  .crud-button-delete {
    background-color: #dc3545;
  }
  
  .crud-button-delete:hover {
    background-color: #c82333;
  }
  
  .crud-button-logout {
    background-color: #6c757d;
  }
  
  .crud-button-logout:hover {
    background-color: #5a6268;
  }
  
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .crud-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .crud-table thead {
    background-color: #f8f9fa;
  }
  
  .crud-table th, .crud-table td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: left;
  }
  
  .crud-table th {
    font-weight: bold;
  }
  
  .crud-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .crud-table tbody tr:hover {
    background-color: #e9ecef;
  }
  
  .actions {
    display: flex;
    gap: 5px;
  }
  
  .add-client-form {
    padding: 20px;
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
    font-weight: bold;
  }
  
  input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 15px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
  }
  
  .crud-button-cancel {
    background-color: #dc3545;
  }
  
  .crud-button-cancel:hover {
    background-color: #c82333;
  }
  
  @media (max-width: 768px) {
    .crud-table {
      border: 0;
      display: block;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
  
    .crud-table thead {
      display: none;
    }
  
    .crud-table tbody {
      display: block;
      width: 100%;
    }
  
    .crud-table tr {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      border: 1px solid #dee2e6;
      border-radius: 5px;
      background-color: #fff;
    }
  
    .crud-table td {
      display: block;
      text-align: left;
      font-size: 14px;
      padding: 10px;
      position: relative;
      border-bottom: 1px solid #ddd;
    }
  
    .crud-table td::before {
      content: attr(data-label);
      font-weight: bold;
      text-transform: uppercase;
      position: absolute;
      left: 0;
      width: 45%;
      padding: 10px;
      background: #f8f9fa;
      border-right: 1px solid #ddd;
      box-sizing: border-box;
    }
  
    .crud-table td:last-child {
      border-bottom: none;
    }
  }
  </style>
  