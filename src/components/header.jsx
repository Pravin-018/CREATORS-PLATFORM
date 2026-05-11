import { Link, useNavigate } from "react-router-dom";
import { clearAuth, isAuthenticated } from "../helpers/auth";

function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav>
      <h2>Creator Platform</h2>
      <div>
        <Link to="/">Home</Link>
        {authenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" onClick={handleLogout} style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: '#d1d5db', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
