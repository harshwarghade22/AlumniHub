import React from 'react';

const LinkedInLogin = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/login/linkedin-oauth2/";
  };

  return <button onClick={handleLogin}>Login with LinkedIn</button>;
};

export default LinkedInLogin;
