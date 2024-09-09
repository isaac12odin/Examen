<template>
    <div class="container mt-4">
      <h2 class="mb-4">Tabla de Datos</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Domicilio</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>
                <input v-if="item.editing" v-model="item.Nombre" class="form-control form-control-sm" />
                {{ !item.editing ? item.Nombre : '' }}
              </td>
              <td>
                <input v-if="item.editing" v-model="item.Apellido_Pa" class="form-control form-control-sm" />
                {{ !item.editing ? item.Apellido_Pa : '' }}
              </td>
              <td>
                <input v-if="item.editing" v-model="item.Apellido_Ma" class="form-control form-control-sm" />
                {{ !item.editing ? item.Apellido_Ma : '' }}
              </td>
              <td>
                <input v-if="item.editing" v-model="item.Domicilio" class="form-control form-control-sm" />
                {{ !item.editing ? item.Domicilio : '' }}
              </td>
              <td>
                <input v-if="item.editing" v-model="item.Correo" class="form-control form-control-sm" />
                {{ !item.editing ? item.Correo : '' }}
              </td>
              <td>
                <button v-if="!item.editing" class="btn btn-warning btn-sm me-2" @click="startEditing(item)">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button v-if="item.editing" class="btn btn-success btn-sm me-2" @click="saveChanges(item)">
                  <i class="fas fa-save"></i> Guardar
                </button>
                <button v-if="item.editing" class="btn btn-secondary btn-sm me-2" @click="cancelEditing(item)">
                  <i class="fas fa-times"></i> Cancelar
                </button>
                <button v-if="!item.editing" class="btn btn-danger btn-sm" @click="deleteItem(item.id)">
                  <i class="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { items: [] };
    },
    async created() {
      await this.fetchItems();
    },
    methods: {
      async fetchItems() {
        try {
          const { data } = await axios.get('http://localhost:3000/api/clientes');
          this.items = data.map(item => ({ ...item, editing: false }));
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      },
      startEditing(item) {
        item.editing = true;
      },
      async saveChanges(item) {
        if (Object.values(item).some(value => !value) || !this.validateEmail(item.Correo)) {
          alert('Todos los campos deben estar completos y el correo debe ser @gmail, @outlook o @hotmail.');
          return;
        }
        try {
          await axios.put(`http://localhost:3000/api/clientes/${item.id}`, item);
          item.editing = false;
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        }
      },
      cancelEditing(item) {
        item.editing = false;
        this.fetchItems();
      },
      async deleteItem(id) {
        try {
          await axios.delete(`http://localhost:3000/api/clientes/${id}`);
          this.items = this.items.filter(item => item.id !== id);
        } catch (error) {
          console.error('Error al eliminar el cliente:', error);
        }
      },
      validateEmail(email) {
        return /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com)$/i.test(email);
      },
      refresh() {
        this.fetchItems();
      }
    }
  };
  </script>
  
  <style scoped>
  .table th, .table td {
    vertical-align: super;
    padding: 0.4rem;
  }
  
  .table-sm td, .table-sm th {
    padding: 0.2rem;
  }
  
  .table-hover tbody tr:hover {
    background-color: #2dd6d6;
  }
  
  .form-control-sm {
    height: 2.5rem;
    font-size: 0.975rem;
  }
  </style>
  