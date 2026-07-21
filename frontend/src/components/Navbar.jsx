import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Post Composer</Link>
      <div className="nav-links">
        {userInfo ? (
          <>
            <Link to="/">Feed</Link>
            <Link to="/create">New Post</Link>
            {userInfo.role === "admin" && <Link to="/admin">Admin</Link>}
            <span className="nav-user">Hi, {userInfo.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
