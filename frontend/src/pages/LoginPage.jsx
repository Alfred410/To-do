import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Login() {
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedback(location.state.feedback);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 px-4">
      <h1 className="text-[37px] text-gray-800  text-center mb-9 mt-3">
        Login
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
      <form className="flex items-center  mt-10 text-black flex-col ">
        <input
          type="email"
          placeholder="Email"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white h-8 w-[100px] rounded mt-[150px] sm:mt-[50px]"
        >
          Login
        </button>
      </form>
      <div className="text-blue-400 flex flex-col items-center text-sm mt-3">
        <a className="mb-2 hover:underline" href="/">
          Forgot Password
        </a>
        <a className="hover:underline" href="/register">
          Register
        </a>
      </div>
    </div>
  );
}
