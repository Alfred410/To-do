import { useState, useEffect, useCallback, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));

  const [user, setUser] = useState(null);
  const logoutTimerRef = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setUser(null);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    navigate('/login', { replace: true });
  }, [navigate, logoutTimerRef]);

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
          setUser(decoded);
          // Sätter en timer för automatisk utloggning
          const timeout = (decoded.exp - now) * 1000;
          if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
          logoutTimerRef.current = setTimeout(logout, timeout);
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
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
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
    <AuthContext.Provider value={{ isLogin, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
