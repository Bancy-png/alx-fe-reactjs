import React from 'react';

function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#1e90ff', fontSize: '24px', marginBottom: '10px' }}>{props.name}</h2>
      <p style={{ fontSize: '16px', color: '#333' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;
