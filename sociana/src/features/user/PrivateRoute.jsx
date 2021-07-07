import { Navigate, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ path, ...props }) {
  const { userLoggedIn } = useSelector((state) => state.user);
  
  return userLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
