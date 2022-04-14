import { Navigate, Route, Routes } from "react-router-dom"
import Auth from "./Auth"
import AuthProtected from "./AuthProtected"
import Home from "./Home"
import Layout from "./Layout"

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="auth" />} />

      <Route path="home" element={<AuthProtected children={<Layout children={<Home />} />} />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  )
}

export default AppRoutes
