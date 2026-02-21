<template>
  <div class="pacientes-container">
    <h1>Lista de Pacientes</h1>
    
    <div v-if="loading" class="loading">Cargando pacientes...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    
   
    <table v-if="!loading && pacientes.length > 0" class="pacientes-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Fecha Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <td>{{ paciente.id }}</td>
          <td>{{ paciente.nombre }}</td>
          <td>{{ paciente.apellido }}</td>
          <td>{{ paciente.direccion }}</td>
          <td>{{ formatDate(paciente.fechaNacimiento) }}</td>
          <td class="acciones">
            <button @click="editarPaciente(paciente.id)" class="btn-ver">
              VER
            </button>
           
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { getAllPacientes  } from '@/clients/pacientes';

export default {
  name: 'ListaPaciente',
  
  data() {
    return {
      pacientes: [],
      loading: false,
      error: "",
      showDeleteModal: false,
      pacienteIdToDelete: null
    }
  },
  
  mounted() {
    this.cargarPacientes();
  },
  
  methods: {
    async cargarPacientes() {
      this.loading = true;
      this.error = "";
      
      try {
        this.pacientes = await getAllPacientes();
      } catch (error) {
        this.error = error.response?.data?.message || "Error al cargar los pacientes";
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(fecha) {
      if (!fecha) return '';
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    
  }
}
</script>

<style scoped>
.pacientes-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #42b983;
  font-size: 1.2rem;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.pacientes-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.pacientes-table thead {
  background-color: #42b983;
  color: white;
}

.pacientes-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.pacientes-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.pacientes-table tbody tr:hover {
  background-color: #f9f9f9;
}

.pacientes-table tbody tr:last-child td {
  border-bottom: none;
}

.acciones {
  display: flex;
  gap: 0.5rem;
}

.btn-ver{
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  background: red;
  
  
}




</style>