import axios from 'axios';

const API_URL = 'http://localhost:8081/api/transactions'; 

export const createTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    console.error('Failed to create transaction:', error);
    throw error;
  }
};
