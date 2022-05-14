import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

// idea taken from one of my earlier projects

export function RequireAuth({ children }) {
  let location = useLocation();

  if (!localStorage.getItem("putovanja-token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
