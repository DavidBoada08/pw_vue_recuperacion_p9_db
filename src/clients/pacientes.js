import axios from "axios";
import { getToken } from "./auth";

const URL = 'http://localhost:8081/consultorio/api/v1.0/pacientes';


const getConfig = () => ({
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});


export const getAllPacientes = async () => {
    try {
        const response = await axios.get(URL, getConfig());
        return response.data;
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        throw error;
    }
};


export const getPacienteById = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`, getConfig());
        return response.data;
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        throw error;
    }
};

// Crear un nuevo paciente
export const createPaciente = async (paciente) => {
    try {
        const response = await axios.post(URL, paciente, getConfig());
        return response.data;
    } catch (error) {
        console.error('Error al crear paciente:', error);
        throw error;
    }
};

// Actualizar un paciente
export const updatePaciente = async (id, paciente) => {
    try {
        const response = await axios.put(`${URL}/${id}`, paciente, getConfig());
        return response.data;
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        throw error;
    }
};

// Eliminar un paciente
export const deletePaciente = async (id) => {
    try {
        const response = await axios.delete(`${URL}/${id}`, getConfig());
        return response.data;
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        throw error;
    }
};
