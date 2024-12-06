import { FC, ReactNode } from "react";
import { AUTH_TOKEN } from "../services/api/auth/Login";
import { Navigate } from "react-router-dom";

interface IGuestRouteProps {
  children: ReactNode;
}

export const GuestRoute: FC<IGuestRouteProps> = ({ children }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
