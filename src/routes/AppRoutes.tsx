import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}