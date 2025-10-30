export default function Regsiter() {
  return (
    <div className="flex flex-col justify-center mt-5 px-4">
      <h1 className="text-[37px] text-gray-800  text-center mb-9 mt-3">
        Register
      </h1>
      <form className="flex items-center  text-black flex-col ">
        <input
          type="text"
          placeholder="Firstname"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Lastname"
          className="my-2 sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
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
        <div className="flex justify-center w-[250px] my-3">
          <input
            type="checkbox"
            className="mr-2 border rounded py-1 pl-2"
            required
          />
          <p className="text-sm text-gray-500">
            I have read and accpet the{' '}
            <a href="/" className="text-blue-400">
              privacy policy
            </a>
          </p>
        </div>
        <button className="bg-indigo-600 text-white h-8 w-[100px] rounded mt-[150px] sm:mt-[50px]">
          Register
        </button>
      </form>
      <a href="/login" className="text-center text-blue-400 text-sm mt-3">
        Login here
      </a>
    </div>
  );
}
