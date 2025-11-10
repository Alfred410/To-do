import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/LoginPage'));
// const Register = lazy(() => import('./pages/RegisterPage'));
// const Profile = lazy(() => import('./pages/ProfilePage'));
// const Privacy = lazy(() => import('./pages/PrivacyPage'));
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import Privacy from './pages/PrivacyPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const Loader = () => <div>Loading...</div>;

function App() {
  return (
    <div>
      <Navbar />
      {/* <Suspense fallback={<Loader />}>    </Suspense> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
