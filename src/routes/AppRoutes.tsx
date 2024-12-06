import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  AddJobs,
  Dashboard,
  PageAccessDenied,
  PageJobs,
  PageLogin,
  PageNotFound,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Outlet />}>
          <Route index element={<PageJobs />} />
          <Route path="adicionar" element={<AddJobs />} />
        </Route>
      </Route>

      <Route
        path="/auth"
        element={
          <GuestRoute>
            <Outlet />
          </GuestRoute>
        }
      >
        <Route index element={<PageLogin />} />
      </Route>

      <Route path="/acesso-negado" element={<PageAccessDenied />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
