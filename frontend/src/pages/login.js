import React from "react";
import LoginFormComponent from '../components/LoginFormComponent';

const LoginFormPage = () => {
  return (
    <div style={{ padding: '45px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <LoginFormComponent />
      </div>
    </div>
  );
};

export default LoginFormPage;