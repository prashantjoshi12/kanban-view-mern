import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_ANY_API_URL}/tasks`

export const fetchTasksAPI = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTaskAPI = async (taskContent, description , status) => {
  try {
    const response = await axios.post(BASE_URL, { task: taskContent, description , status});
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTaskStatusAPI = async (taskId, newStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const updateTaskAPI = async (taskId, taskContent, description) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, { task: taskContent, description: description });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
