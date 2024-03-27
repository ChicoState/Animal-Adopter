import React from "react";
import UserFormComponent from '../components/UserFormComponent';

const CreateProfile = () => {
  return (
    <div style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Create a profile</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <UserFormComponent />
      </div>
    </div>
  );
};

export default CreateProfile;