import CssBaseline from '@mui/material/CssBaseline'
import Snackbar from "./Snackbar"
import CreatePostModal from "./CreatePostModal"
import AppRoutes from "./AppRoutes"
import ViewImage from './ViewImage'
import EditProfileModal from './EditProfileModal'
import CommentsModal from './CommentsModal'
import { useEffect } from 'react'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { authActions } from '../redux/reducers/auth'
import useAuth from '../hooks/useAuth'
import FullScreenLoader from './FullScreenLoader'


const App = () => {

  const auth = useAuth()

  const dispatch = useTypedDispatch()

  useEffect(() => {
    const token = localStorage.getItem('auth-token')

    if (token) {
      dispatch(authActions.verifyToken(token))
    }
  }, [])

  if (auth.isVerifyingToken) {
    return <FullScreenLoader />
  }

  return <>
    <AppRoutes />
    <ViewImage />
    <CssBaseline />
    <Snackbar />
  </>
}

export default App

const Test: React.FC = () => {
  return <h1>Daler</h1>
}
