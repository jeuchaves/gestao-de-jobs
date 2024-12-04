import { Outlet, Route, Routes } from "react-router-dom";
import { AddJobs, Dashboard } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Outlet />}>
        <Route path="adicionar" element={<AddJobs />} />
      </Route>
    </Routes>
  );
};
