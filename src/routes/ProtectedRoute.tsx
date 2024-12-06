import { FC, ReactNode } from "react";
import { AUTH_TOKEN, AUTH_USER } from "../services/api/auth/Login";
import { Navigate } from "react-router-dom";

type TRoles = "admin" | "collaborator" | "guest";

interface IProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Array<TRoles>;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const user = JSON.parse(localStorage.getItem(AUTH_USER) || "{}");
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!user || !token) {
    return <Navigate to="/auth" />;
  }

  if (!requiredRoles) {
    return <>{children}</>;
  }

  const hasRequiredRole = requiredRoles.includes(user.role);

  if (!hasRequiredRole) {
    return <Navigate to="/acesso-negado" />;
  }

  return <>{children}</>;
};
