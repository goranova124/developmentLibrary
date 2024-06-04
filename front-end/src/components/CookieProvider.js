import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const CookieProvider = () => {
  const [cookies, setCookie] = useCookies(['token', 'email']);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedToken = cookies.token;
    const storedEmail = cookies.email;
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedEmail) {
      console.log(storedEmail);
      setEmail(storedEmail);
    }
  
  }, [cookies]);



  return ( email, token );
};
