import React from 'react';

function Header() {
  return (
    <header style={{
      backgroundColor: '#003366',
      color: '#ffffff',
      textAlign: 'center',
      padding: '30px 0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '36px' }}>My Favorite Cities</h1>
    </header>
  );
}

export default Header;
