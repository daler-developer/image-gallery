import { Navigate, Route, Routes } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline'
import AuthProtected from "./AuthProtected"
import Auth from "./Auth"
import Home from "./Home"
import Snackbar from "./Snackbar"
import CreatePostModal from "./CreatePostModal"
import { useEffect } from "react"
import useTypedDispatch from "../hooks/useTypedDispatch"
import { usersActions } from "../redux/reducers/users"
import useAuth from "../hooks/useAuth"
import { postsActions } from "../redux/reducers/posts"


const App = () => {

  const auth = useAuth()

  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(usersActions.fetchUsers())
      dispatch(postsActions.setSelectedUser(auth.currentUser._id))
    }
  }, [auth.isAuthenticated])

  return <>
    <Routes>
      <Route index element={<Navigate to="auth" />} />

      <Route path="home" element={<Home />} />
      <Route path="auth" element={<Auth />} />
    </Routes>

    <CssBaseline />
    <Snackbar />
    <CreatePostModal />
  </>
}

export default App
