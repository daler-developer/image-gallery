import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

interface IProps {
  children: any
}

const AuthProtected = ({ children }: IProps) => {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate to='/auth?tab=login' />
  }

  return children
}

export default AuthProtected
