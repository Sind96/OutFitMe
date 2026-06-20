import { useAppSelector } from "../../store/hooks/reduxHooks";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
}
