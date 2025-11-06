import {  useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/login', { replace: true });
  }, [navigate]);

  useEffect(() => {

    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLogin(false);
        return;
      }

      try {
        const decoded = jwt_decode(token);
        const now = Date.now() / 1000; // sekunder

        if (decoded.exp < now) {
          logout();
        } else {
          setIsLogin(true);

          // Sätter en timer för automatisk utloggning
          const timeout = (decoded.exp - now) * 1000;
          const timer = setTimeout(logout, timeout);
          return () => clearTimeout(timer);
        }
      } catch {
        logout();
      }
    };

    checkToken();

    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLogin(true);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
