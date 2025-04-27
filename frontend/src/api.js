import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User API calls
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Task API calls
export const createTask = async (taskData, token) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateTask = async (id, taskData, token) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteTask = async (id, token) => {
    await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Project API calls
export const createProject = async (projectData, token) => {
    const response = await axios.post(`${API_URL}/projects`, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getProjects = async (token) => {
    const response = await axios.get(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProject = async (id, projectData, token) => {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProject = async (id, token) => {
    await axios.delete(`${API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};