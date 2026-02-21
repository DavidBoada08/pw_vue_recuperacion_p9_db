

<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Iniciar Sesión</h2>
      
      <div class="form-group">
        <label for="usuario">Usuario</label>
        <input 
          type="text" 
          id="usuario"
          v-model="usuario" 
          placeholder="usuario"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="contraseña">Contraseña</label>
        <input 
          type="password" 
          id="contraseña"
          v-model="contraseña" 
          placeholder="*****"
          required
        >
      </div>
      
      <button type="submit">Ingresar</button>
      
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="loading" class="loading">Cargando...</div>
    </form>
  </div>
</template>

<script>
import { login, setToken } from '@/clients/auth';

export default {
  name: 'Login',
  
  data() {
    return {
      usuario: "",
      contraseña: "",
      error: "",
      loading: false
    }
  },
  
  methods: {
    async handleLogin() {
      this.error = "";
      this.loading = true;
      
      try {
        const response = await login(this.usuario, this.contraseña);
        
        if (response.token) {
          setToken(response.token);
          this.$router.push('/'); 
        } else {
          this.error = "Error en la respuesta del servidor";
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.";
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee;
  color: #c33;
  border-radius: 4px;
  text-align: center;
}

.loading {
  margin-top: 1rem;
  text-align: center;
  color: #42b983;
}
</style>