import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const token = import.meta.env.VITE_GITHUB_TOKEN;

const headers = token ? { Authorization: `token ${token}` } : {};

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const fetchUsersAdvanced = async (username, location, minRepos) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query.trim())}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Advanced search failed');
  }
};
