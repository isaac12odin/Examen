<template>
<<<<<<< HEAD
    <div class="container mt-4">
      <button class="btn btn-primary mb-3" @click="toggleForm">
        <i class="fas fa-plus"></i> Agregar Cliente
      </button>
  
      <div v-if="showForm" class="card shadow-sm">
        <div class="card-header bg-light">
          <h4 class="mb-0">Agregar Nuevo Cliente</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="addClient">
            <div v-for="(value, key) in cliente" :key="key" class="mb-3">
              <label :for="key" class="form-label">{{ formatLabel(key) }}</label>
              <input
                v-model="cliente[key]"
                :type="key === 'Correo' ? 'email' : 'text'"
                class="form-control"
                :id="key"
                required
              />
              <div v-if="key === 'Correo' && correoError" class="text-danger mt-2">
                El correo debe ser @gmail, @outlook o @hotmail.
              </div>
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
            <button type="button" class="btn btn-secondary ms-2" @click="resetForm">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showForm: false,
        cliente: {
          Nombre: '',
          Apellido_Pa: '',
          Apellido_Ma: '',
          Domicilio: '',
          Correo: ''
        },
        correoError: false
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) this.resetForm();
      },
      formatLabel(key) {
        return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      },
      isValidEmail(email) {
        const regex = /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com)$/i;
        return regex.test(email);
      },
      async addClient() {
        if (!this.isValidEmail(this.cliente.Correo)) {
          this.correoError = true;
          return;
        }
  
        try {
          await axios.post('http://localhost:3000/api/clientes', this.cliente);
          this.$emit('clientAdded'); // Notify parent component
          this.resetForm();
        } catch (error) {
          console.error('Error al agregar el cliente:', error);
          alert('Error al agregar el cliente. Intenta de nuevo.');
        }
      },
      resetForm() {
        this.cliente = { Nombre: '', Apellido_Pa: '', Apellido_Ma: '', Domicilio: '', Correo: '' };
        this.correoError = false;
        this.showForm = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 0.5rem;
  }
  
  .card-header {
    background-color: #f8f9fa;
  }
  
  .form-control {
    border-radius: 0.25rem;
  }
  
  .btn {
    border-radius: 0.25rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  
  .btn-success {
    background-color: #28a745;
    border: none;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border: none;
  }
  </style>
  
=======
  <div class="container mt-4">
    <button class="btn btn-primary mb-3" @click="toggleForm">
      <i class="fas fa-plus"></i> Agregar Cliente
    </button>

    <div v-if="showForm" class="card shadow-sm">
      <div class="card-header bg-light">
        <h4 class="mb-0">Agregar Nuevo Cliente</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="addClient">
          <div v-for="(value, key) in cliente" :key="key" class="mb-3">
            <label :for="key" class="form-label">{{ formatLabel(key) }}</label>
            <input
              v-model="cliente[key]"
              :type="key === 'Correo' ? 'email' : 'text'"
              class="form-control"
              :id="key"
              required
            />
            <!-- Mensajes de error para campos vacíos -->
            <div v-if="formErrors[key]" class="text-danger mt-2">{{ formErrors[key] }}</div>
            <!-- Validación adicional de correo -->
            <div v-if="key === 'Correo' && correoError" class="text-danger mt-2">
              El correo debe ser @gmail, @outlook o @hotmail.
            </div>
          </div>
          <button type="submit" class="btn btn-success">Guardar</button>
          <button type="button" class="btn btn-secondary ms-2" @click="resetForm">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showForm: false,
      cliente: {
        Nombre: '',
        Apellido_Pa: '',
        Apellido_Ma: '',
        Domicilio: '',
        Correo: ''
      },
      formErrors: {},
      correoError: false
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    formatLabel(key) {
      return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    },
    isValidEmail(email) {
      const regex = /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com)$/i;
      return regex.test(email);
    },
    validateForm() {
      this.formErrors = {};
      let isValid = true;

      Object.keys(this.cliente).forEach(key => {
        if (!this.cliente[key]) {
          this.formErrors[key] = `El campo ${this.formatLabel(key)} es obligatorio.`;
          isValid = false;
        }
      });

      if (!this.isValidEmail(this.cliente.Correo)) {
        this.formErrors.Correo = 'El correo debe ser @gmail, @outlook o @hotmail.';
        isValid = false;
      }

      return isValid;
    },
    async addClient() {
      if (!this.validateForm()) {
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/clientes', this.cliente);
        this.$emit('clientAdded'); // Notificar al componente padre
        this.resetForm();
      } catch (error) {
        console.error('Error al agregar el cliente:', error);
        alert('Error al agregar el cliente. Intenta de nuevo.');
      }
    },
    resetForm() {
      this.cliente = { Nombre: '', Apellido_Pa: '', Apellido_Ma: '', Domicilio: '', Correo: '' };
      this.formErrors = {};
      this.correoError = false;
      this.showForm = false;
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.card-header {
  background-color: #f8f9fa;
}

.form-control {
  border-radius: 0.25rem;
}

.btn {
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-success {
  background-color: #28a745;
  border: none;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}
</style>
>>>>>>> 1abc209 (Primer commit: subiendo el proyecto)
