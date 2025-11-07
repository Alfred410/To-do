import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

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

  const setAuth = (token, newUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLogin(true);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
