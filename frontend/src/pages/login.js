import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  return (
    <div style={{ paddingTop: '60px' }}>
      <GoogleLogin
        clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
        redirectUri="http://localhost:3000"
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={error => {
          console.log('Login Failed:', error);
        }}
      />
    </div>
  );
};

export default LoginPage;

