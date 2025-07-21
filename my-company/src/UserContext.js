// src/UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useState({
    name: 'Bancy Wanjohi',
    email: 'bancy@example.com',
    location: 'Nairobi, Kenya',
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
