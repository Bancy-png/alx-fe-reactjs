import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#222',
      color: '#fff',
      textAlign: 'center',
      padding: '20px 0',
      marginTop: 'auto'
    }}>
      <p style={{ margin: 0, fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} My Favorite Cities. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
