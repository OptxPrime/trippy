import { useState } from 'react';

// idea and implementation from: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('putovanja-token');
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userType, userToken) => {
    localStorage.setItem('putovanja-token', JSON.stringify(`${userType}#${userToken}`));
    setToken(userToken.token);
  };

  const getUserType = () => {
    return JSON.parse(getToken()).split('#')[0];
  }

  return {
    setToken: saveToken,
    token,
    getUserType
  }
}