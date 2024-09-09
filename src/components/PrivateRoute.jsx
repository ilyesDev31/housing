import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const user = useSelector((state) => state.user);
  return user.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
