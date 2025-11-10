import { Link, useNavigate } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { useAuth } from '../context/useAuth';
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const CloseIcon = lazy(() => import('@mui/icons-material/Close'));
const HomeIcon = lazy(() => import('@mui/icons-material/Home'));
const AccountCircleIcon = lazy(
  () => import('@mui/icons-material/AccountCircle')
);
const LoginIcon = lazy(() => import('@mui/icons-material/Login'));
const LogoutIcon = lazy(() => import('@mui/icons-material/Logout'));

const LazyIcon = ({ children }) => (
  <Suspense fallback={<span className="w-5 h-5 inline-block" />}>
    {children}
  </Suspense>
);

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
    <header className=" bg-purple-900  sticky top-0 z-10 shadow-md text-white ">
      <nav className="flex relative md:justify-end items-center p-4">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <LazyIcon>{isOpen ? <CloseIcon /> : <MenuIcon />}</LazyIcon>
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
              <LazyIcon>
                <HomeIcon />
              </LazyIcon>
              Hem
            </Link>
            <Link
              to="profile"
              className="mr-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <LazyIcon>
                <AccountCircleIcon />
              </LazyIcon>
              Profil
            </Link>

            {isLogin ? (
              <button onClick={handleLogout}>
                <LazyIcon>
                  <LogoutIcon />
                </LazyIcon>
                Logga ut
              </button>
            ) : (
              <Link
                to="/login"
                className="mr-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <LazyIcon>
                  <LoginIcon />
                </LazyIcon>
                Logga in
              </Link>
            )}
          </div>
        )}

        {/* Desktop */}
        <div className="hidden md:flex justify-end ">
          <Link to="/" className="mr-3">
            <LazyIcon>
              <HomeIcon />
            </LazyIcon>
            Hem
          </Link>
          <Link to="profile" className="mr-2">
            <LazyIcon>
              <AccountCircleIcon />
            </LazyIcon>
            Profil
          </Link>

          {isLogin ? (
            <button onClick={handleLogout}>
              <LazyIcon>
                <LogoutIcon />
              </LazyIcon>
              Logga ut
            </button>
          ) : (
            <Link to="/login" className="mr-2">
              <LazyIcon>
                <LoginIcon />
              </LazyIcon>
              Logga in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
