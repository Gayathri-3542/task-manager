import axios from "axios";

// Backend base URL
const API_URL = "https://task-manager-upu6.onrender.com/api/tasks";

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
