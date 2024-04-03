import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  return (
    <div style={{ paddingTop: '60px' }}>
      <GoogleLogin
        clientId="301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com"
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

