import { useState } from 'react';
import { fetchUsersAdvanced, fetchUserData } from '../services/githubService'; // 🟢 Import both

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [detailedUser, setDetailedUser] = useState(null); // Optional: show details

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);
    setDetailedUser(null);

    try {
      const data = await fetchUsersAdvanced(username, location, minRepos);
      setUsers(data.items);

      // 🟢 Fetch detailed info for the first result
      if (data.items.length > 0) {
        const firstUser = data.items[0];
        const detailed = await fetchUserData(firstUser.login);
        setDetailedUser(detailed); // Optional for display
      }
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        {/* Inputs */}
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

      {/* Optional: Display first detailed user */}
      {detailedUser && (
        <div className="border p-4 rounded shadow mb-4">
          <h3 className="text-lg font-bold">First User Detailed Info</h3>
          <p>Login: {detailedUser.login}</p>
          <p>Name: {detailedUser.name}</p>
          <p>Public Repos: {detailedUser.public_repos}</p>
          <a href={detailedUser.html_url} target="_blank" rel="noreferrer" className="text-blue-600">
            GitHub Profile
          </a>
        </div>
      )}

      {/* All users */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
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
