// src/api.ts
import axios from "axios";

const BASE_URL = "http://localhost:3002"; // Update with your server URL

export const addTask = async (taskName: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, {
      taskName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async ({
  taskId,
  taskName,
  completed,
}: {
  taskId: number;
  taskName: string;
  completed: boolean;
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, {
      taskName,
      completed,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};

export const completeAllTask = async () => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/all-complete`);
    return response.data;
  } catch (error) {
    console.log("Error deleting completed tasks", error);
    throw error;
  }
};

export const deleteAllCompleted = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/completed`);
    return response.data;
  } catch (error) {
    console.log("Error deleting completed", error);
    throw error;
  }
};
