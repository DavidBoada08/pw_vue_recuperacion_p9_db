<template>
  <div class="paciente-container">

 
    
    <form @submit.prevent="guardarPaciente" class="paciente-form">
      <div class="form-group">
        <label for="id">ID</label>
        <input 
          type="text" 
          id="id"
          v-model="paciente.id" 
          placeholder="Ingrese el ID del paciente"
        
        >
       
      </div>
      
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input 
          type="text" 
          id="nombre"
          v-model="paciente.nombre" 
          placeholder="Ingrese el nombre"
         
        >
      </div>
      
      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input 
          type="text" 
          id="apellido"
          v-model="paciente.apellido" 
          placeholder="Ingrese el apellido"
          
        >
      </div>
      
      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input 
          type="text" 
          id="direccion"
          v-model="paciente.direccion" 
          placeholder="Ingrese la dirección"
         
        >
      </div>
      
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento</label>
        <input 
          type="date" 
          id="fechaNacimiento"
          v-model="paciente.fechaNacimiento" 
         
        >
      </div>
      
  
   
    </form>
  </div>
</template>

<script>
import { createPaciente } from '@/clients/pacientes';

export default {
  name: 'Paciente',
  
  data() {
    return {
      paciente: {
        id: '',
        nombre: '',
        apellido: '',
        direccion: '',
        fechaNacimiento: ''
      },
      loading: false,
      error: '',
      success: '',
      isEditMode: false
    }
  },
  
  mounted() {
   
    const id = this.$route.params.id;
    if (id) {
      this.isEditMode = true;
      this.cargarPaciente(id);
    }
  },
  
  methods: {
    async cargarPaciente(id) {
      this.loading = true;
      this.error = '';
      
      try {
        const data = await getPacienteById(id);
        this.paciente = {
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          fechaNacimiento: this.formatDateForInput(data.fechaNacimiento)
        };
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar el paciente';
      } finally {
        this.loading = false;
      }
    },
    
    async guardarPaciente() {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      try {
        if (this.isEditMode) {
       
          await updatePaciente(this.paciente.id, this.paciente);
          this.success = 'Paciente actualizado correctamente';
        } else {
       
          await createPaciente(this.paciente);
          this.success = 'Paciente creado correctamente';
        }
        
       
        setTimeout(() => {
          this.$router.push('/pacientes');
        }, 1500);
        
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al guardar el paciente';
      } finally {
        this.loading = false;
      }
    },
    
 
    formatDateForInput(fecha) {
      if (!fecha) return '';
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
.paciente-container {
display: flex;
justify-content: center;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.success-message {
  background-color: #efe;
  color: #3c3;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.paciente-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-guardar, .btn-cancelar {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-guardar {
  background-color: #42b983;
  color: white;
}

.btn-guardar:hover:not(:disabled) {
  background-color: #359268;
}

.btn-guardar:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-cancelar {
  background-color: #95a5a6;
  color: white;
}

.btn-cancelar:hover {
  background-color: #7f8c8d;
}

/* Responsive */
@media (max-width: 768px) {
  .paciente-container {
    padding: 1rem;
  }
  
  .paciente-form {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>