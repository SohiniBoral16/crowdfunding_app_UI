import axios from "axios";

const API_URL = "http://localhost:8081/api/projects";

export const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProjectsList = async () => {
  const response = await axios.get(`${API_URL}/projectsList`);
  return response.data;
};


export const addProject = async (project) => {
  const response = await axios.post(API_URL, project);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await axios.put(`${API_URL}/${id}`, project);
  return response.data;
};

export const getProjectsByUser = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProjectsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return [];
  }
};
