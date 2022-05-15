import { useState } from 'react';

// idea and implementation from: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('putovanja-token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userType,userToken) => {
    localStorage.setItem('putovanja-token', JSON.stringify(`${userType}#${userToken}`));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}