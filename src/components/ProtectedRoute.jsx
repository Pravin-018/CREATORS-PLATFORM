import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
