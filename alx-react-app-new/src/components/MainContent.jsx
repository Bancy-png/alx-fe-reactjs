import React from 'react';
import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main style={{
      padding: '40px 20px',
      backgroundColor: '#f5f5f5',
      minHeight: '70vh'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '28px' }}>
        Welcome to My City List
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Discover some amazing cities and meet the people who love them.
      </p>

      {/* Example User Profiles */}
      <UserProfile name="Alice" age="28" bio="Loves the energy of New York." />
      <UserProfile name="Brian" age="35" bio="Finds peace in Kyoto's temples." />
      <UserProfile name="Cynthia" age="24" bio="Can't get enough of Cape Town's beaches." />
    </main>
  );
}

export default MainContent;
