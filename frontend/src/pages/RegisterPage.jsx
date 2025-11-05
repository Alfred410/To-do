import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/userService';

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(firstName, lastName, email, password);
      setFeedback({ type: 'success', message: 'Registrering lyckades' });
      navigate('/login');
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="flex flex-col justify-center mt-5 px-4">
      <h1 className="text-[37px] text-gray-800  text-center mb-9 mt-3">
        Registrera dig
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
        className="flex items-center  text-black flex-col "
      >
        <input
          type="text"
          placeholder="Förnamn"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Efternamn"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-post"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center w-[250px] my-3">
          <input
            type="checkbox"
            className="mr-2 border rounded py-1 pl-2"
            required
          />
          <p className="text-sm text-gray-500">
            Jag har läst och accepterat{' '}
            <a href="/" className="text-blue-400">
              integritetspolicy
            </a>
          </p>
        </div>
        <button className="bg-indigo-600 text-white h-8 w-[100px] rounded mt-[150px] sm:mt-[50px]">
          Registrera
        </button>
      </form>
      <Link to="/login" className="text-center text-blue-400 text-sm mt-3">
        Logga in här
      </Link>
    </div>
  );
}
