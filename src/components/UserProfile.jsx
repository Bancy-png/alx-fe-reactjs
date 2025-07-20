import React from 'react';

const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
