import { Navigate, Route, Routes } from "react-router-dom"
import Auth from "./Auth"
import Home from "./Home"

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="auth" />} />

      <Route path="home" element={<Home />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  )
}

export default AppRoutes
