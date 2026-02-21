import axios from "axios"

const URL = 'http://localhost:8082/auth';

// Mock credentials
const USER = 'david';
const PASSWORD = '123456';

export const login = async (usuario, contraseña) => {
    try {
        // Validar credenciales contra mock
        if (usuario !== USER || contraseña !== PASSWORD) {
            throw new Error('Credenciales inválidas');
        }
        const response = await axios.post(`${URL}/login`, {
            usuario ,
            contraseña
        });
        return response.data; 
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const logout = () => {
    localStorage.removeItem('token');
};
