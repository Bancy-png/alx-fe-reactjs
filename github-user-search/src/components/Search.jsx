import { useState } from 'react';
import { fetchUsersAdvanced } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const data = await fetchUsersAdvanced(username, location, minRepos);
      setUsers(data.items); // GitHub Search API returns an object with `items`
    } catch (err) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <h2 className="text-xl font-semibold">{user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
