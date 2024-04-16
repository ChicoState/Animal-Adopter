import React from "react";
import LoginFormComponent from '../components/LoginFormComponent';

const LoginFormPage = () => {
  return (
    <div style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Create a profile</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <LoginFormComponent />
      </div>
    </div>
  );
};

export default LoginFormPage;