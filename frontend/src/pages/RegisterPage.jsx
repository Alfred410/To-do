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
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(firstName, lastName, email, password, privacyAccepted);
      setFeedback({ type: 'success', message: 'Registrering lyckades' });
      navigate('/login');
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 px-4">
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
        <div className="w-full flex flex-col  max-w-[210px] my-2">
          <label className="block text.sm font-semibold text-left text-gray-700">
            Förnamn (valfritt)
          </label>
          <input
            type="text"
            placeholder="Förnamn (valfritt)"
            className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col  max-w-[210px] my-2">
          <label className="block text.sm font-semibold text-left text-gray-700">
            Efternamn (valfritt)
          </label>
          <input
            type="text"
            placeholder="Efternamn (valfritt)"
            className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col  max-w-[210px] my-2">
          <label className="block text.sm font-semibold text-left text-gray-700">
            E-post
            <span className="text-red-500 "> *</span>
          </label>
          <input
            type="email"
            placeholder="E-post"
            className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col  max-w-[210px] my-2">
          <label className="block text.sm font-semibold text-left text-gray-700">
            Lösenord
            <span className="text-red-500 "> *</span>
          </label>
          <input
            type="password"
            placeholder="Lösenord"
            className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center w-[200px] my-3">
          <input
            type="checkbox"
            className="mr-2 border rounded py-1 pl-2"
            required
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
          />
          <p className="text-sm text-gray-500">
            Jag har läst och accepterat{' '}
            <Link to="/privacy" className="text-blue-400">
              integritetspolicy
            </Link>
          </p>
        </div>
        <button className="bg-purple-600 text-white h-8 w-[100px] rounded mt-[150px] sm:mt-[50px]">
          Registrera
        </button>
      </form>
      <Link to="/login" className="text-center text-blue-400 text-sm mt-3">
        Logga in här
      </Link>
    </div>
  );
}
