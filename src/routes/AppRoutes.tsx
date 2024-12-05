import { Outlet, Route, Routes } from "react-router-dom";
import {
  AddJobs,
  Dashboard,
  PageJobs,
  PageLogin,
  PageNotFound,
} from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/auth" element={<Outlet />}>
        <Route index element={<PageLogin />} />
      </Route>

      <Route path="/jobs" element={<Outlet />}>
        <Route index element={<PageJobs />} />
        <Route path="adicionar" element={<AddJobs />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
