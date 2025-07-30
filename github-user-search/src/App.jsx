import React, { useState } from 'react';
import Search from './components/Search';
import { searchGitHubUsers } from './services/githubService';
import './style.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    try {
      const data = await searchGitHubUsers(query);
      setUsers(data.items);
      setError('');
    } catch (err) {
      setUsers([]);
      setError('Failed to fetch users. Please try again.');
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p className="error">{error}</p>}

      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <h3>{user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
