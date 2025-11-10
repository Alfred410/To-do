import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));

  const [user, setUser] = useState(null);
  const [logoutTimer] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setUser(null);
    if (logoutTimer) clearTimeout(logoutTimer);
    navigate('/login', { replace: true });
  }, [navigate, logoutTimer]);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLogin(false);
        setUser(null);
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

  const setAuth = (token) => {
    localStorage.setItem('token', token);
    setIsLogin(true);
    try {
      setUser(jwt_decode(token));
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, setUser, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
