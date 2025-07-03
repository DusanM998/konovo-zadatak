import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../storage/redux/store";
import type { JSX } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.userAuthStore);

  if (!user.username) {
    return <Navigate to="/" replace />;
  }

  return children;
}