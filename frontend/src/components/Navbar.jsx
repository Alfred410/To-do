import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState();
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <header className=" bg-gray-500  sticky top-0 z-10 shadow-md text-white ">
      <nav className="flex relative md:justify-end items-center p-4">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-xl
         font-bold"
        >
          <h1>ToDo</h1>
        </Link>

        {/* Mobile menu */}
        {isOpen && (
          <div className="flex flex-col items-center gap-4 left-0 bg-gray-300 absolute w-full top-full">
            <Link to="/" className="mr-3" onClick={() => setIsOpen(!isOpen)}>
              <HomeIcon /> Home
            </Link>
            <Link
              to="profile"
              className="mr-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AccountCircleIcon /> Profile
            </Link>

            {isLogin ? (
              <button onClick={handleLogout}>
                <LogoutIcon /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="mr-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <LoginIcon /> Login
              </Link>
            )}
          </div>
        )}

        {/* Desktop */}
        <div className="hidden md:flex justify-end ">
          <Link to="/" className="mr-3">
            <HomeIcon /> Home
          </Link>
          <Link to="profile" className="mr-2">
            <AccountCircleIcon /> Profile
          </Link>

          {isLogin ? (
            <button onClick={handleLogout}>
              <LogoutIcon /> Logout
            </button>
          ) : (
            <Link to="/login" className="mr-2">
              <LoginIcon /> Login
            </Link>
          )}
        </div>

        {/* <Link to="/" className="mr-3">
          Home
        </Link>
        <Link to="/login" className="mr-2">
          Login
        </Link>
        <Link to="register" className="mr-2">
          Register
        </Link>
        <Link to="profile" className="mr-2">
          Profile
        </Link> */}
      </nav>
    </header>
  );
}
