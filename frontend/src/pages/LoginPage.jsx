import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '../services/userService';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedback(location.state.feedback);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = await login(email, password);
      setAuth(token);
      navigate('/');
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 px-4">
      <h1 className="text-[37px] text-gray-800  text-center mb-9 mt-3">
        Logga in
      </h1>
      {feedback && (
        <div
          className={`p-2 rounded w-[210px] text-center  ${
            feedback.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {feedback.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex items-center  mt-10 text-black flex-col"
      >
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">
            E-post
          </label>
          <input
            type="email"
            placeholder="E-post"
            className="sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">
            Lösenord
          </label>
          <input
            type="password"
            placeholder="Lösenord"
            className="sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 cursor-pointer hover:bg-purple-500 text-white h-8 w-[100px] rounded mt-[150px] sm:mt-[50px]"
        >
          Logga in
        </button>
      </form>
      <div className="text-blue-400 flex flex-col items-center text-sm mt-3">
        <Link className="hover:underline" to="/register">
          Registrera dig här
        </Link>
      </div>
    </div>
  );
}
