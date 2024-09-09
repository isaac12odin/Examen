<template>
  <div class="container mt-4">
    <h2 class="mb-4">Tabla de Datos</h2>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover table-sm">
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
              <span v-else>{{ item.Nombre }}</span>
              <small v-if="item.editing && !item.Nombre" class="text-danger">El nombre es obligatorio.</small>
            </td>
            <td>
              <input v-if="item.editing" v-model="item.Apellido_Pa" class="form-control form-control-sm" />
              <span v-else>{{ item.Apellido_Pa }}</span>
              <small v-if="item.editing && !item.Apellido_Pa" class="text-danger">El apellido paterno es obligatorio.</small>
            </td>
            <td>
              <input v-if="item.editing" v-model="item.Apellido_Ma" class="form-control form-control-sm" />
              <span v-else>{{ item.Apellido_Ma }}</span>
              <small v-if="item.editing && !item.Apellido_Ma" class="text-danger">El apellido materno es obligatorio.</small>
            </td>
            <td>
              <input v-if="item.editing" v-model="item.Domicilio" class="form-control form-control-sm" />
              <span v-else>{{ item.Domicilio }}</span>
              <small v-if="item.editing && !item.Domicilio" class="text-danger">El domicilio es obligatorio.</small>
            </td>
            <td>
              <input v-if="item.editing" v-model="item.Correo" class="form-control form-control-sm" />
              <span v-else>{{ item.Correo }}</span>
              <small v-if="item.editing && !item.Correo" class="text-danger">El correo es obligatorio.</small>
              <small v-if="item.editing && correoError" class="text-danger">Correo inválido.</small>
            </td>
            <td>
              <div class="d-flex justify-content-between">
                <button v-if="!item.editing" class="btn btn-warning btn-sm" @click="startEditing(item)">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button v-if="item.editing" class="btn btn-success btn-sm" @click="saveChanges(item)">
                  <i class="fas fa-save"></i> Guardar
                </button>
                <button v-if="item.editing" class="btn btn-secondary btn-sm" @click="cancelEditing(item)">
                  <i class="fas fa-times"></i> Cancelar
                </button>
                <button v-if="!item.editing" class="btn btn-danger btn-sm" @click="deleteItem(item.id)">
                  <i class="fas fa-trash-alt"></i> Eliminar
                </button>
              </div>
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
    return {
      items: [],
      correoError: false
    };
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
        this.correoError = !this.validateEmail(item.Correo);
        return;
      }
      try {
        await axios.put(`http://localhost:3000/api/clientes/${item.id}`, item);
        item.editing = false;
        this.correoError = false;
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
    }
  }
};
</script>

<style scoped>
.table {
  font-size: 0.9rem;
}

.table-hover tbody tr:hover {
  background-color: #f2f2f2;
}

.d-flex {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.75rem;
  }

  .d-flex {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
