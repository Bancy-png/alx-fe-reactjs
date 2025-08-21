// src/components/User.jsx
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function User() {
  const user = useContext(UserContext);

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
    </div>
  );
}

export default User;
