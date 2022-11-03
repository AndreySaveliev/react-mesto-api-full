import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, isLogged }) {
  return isLogged ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
