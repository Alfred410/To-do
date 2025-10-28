import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className=" bg-black text-white">
      <nav className="flex justify-evenly">
        <Link to="/" className="mr-3">
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
        </Link>
      </nav>
    </div>
  );
}
