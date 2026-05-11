import { Navigate, useNavigate } from "react-router-dom";
import { clearAuth, getToken, getUser, isAuthenticated } from "../helpers/auth";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    clearAuth();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: '1rem' }}>
        <p>Welcome back, <strong>{user?.name || 'Creator'}</strong>!</p>
        <p>Email: {user?.email}</p>
      </div>
      <div>
        <p><strong>Token preview</strong></p>
        <textarea
          readOnly
          rows={6}
          style={{ width: '100%', borderRadius: '0.75rem', border: '1px solid #d1d5db', padding: '1rem' }}
          value={token || 'No token available'}
        />
      </div>
      <button onClick={handleLogout} style={{ marginTop: '1.5rem' }}>
        Logout
      </button>
    </main>
  );
}

export default Dashboard;
