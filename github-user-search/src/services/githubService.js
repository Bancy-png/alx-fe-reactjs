import axios from 'axios';

const BASE_URL = 'https://api.github.com/users/';
const token = import.meta.env.VITE_GITHUB_TOKEN;

const headers = token ? { Authorization: `token ${token}` } : {};

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}${username}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};
