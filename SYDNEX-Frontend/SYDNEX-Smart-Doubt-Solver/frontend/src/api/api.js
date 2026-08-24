import axios from 'axios';

const API_BASE_URL = 'https://sydnex-backend1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const askDoubt = async (question, image = null, userId = null, userRole = 'student') => {
  const formData = new FormData();
  formData.append('question', question);
  formData.append('userId', userId);
  formData.append('userRole', userRole);
  if (image) {
    formData.append('image', image);
  }
  
  const response = await api.post('/ask', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getUserHistory = async (userId = null, role = null) => {
  const params = new URLSearchParams();
  if (userId) params.append('userId', userId);
  if (role) params.append('role', role);
  
  const response = await api.get(`/history?${params.toString()}`);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await api.get('/leaderboard');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
};

export const getPendingEvaluations = async () => {
  const response = await api.get('/pending-evaluations');
  return response.data;
};

export const evaluateAnswer = async (questionId, evaluation, teacherId) => {
  const response = await api.post('/evaluate', {
    questionId,
    evaluation,
    teacherId
  });
  return response.data;
};

export const getLiveQnAMessages = async () => {
  const response = await api.get('/live-qna');
  return response.data;
};

export default api;