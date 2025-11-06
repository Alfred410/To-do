import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
