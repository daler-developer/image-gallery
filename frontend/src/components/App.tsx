import CssBaseline from '@mui/material/CssBaseline'
import Snackbar from "./Snackbar"
import CreatePostModal from "./CreatePostModal"
import AppRoutes from "./AppRoutes"
import ViewImage from './ViewImage'
import EditProfileModal from './EditProfileModal'
import CommentsModal from './CommentsModal'


const App = () => {
  return <>
    <AppRoutes />
    <CssBaseline />
    <Snackbar />
    <ViewImage />
    <CreatePostModal />
    <EditProfileModal />
    <CommentsModal />
  </>
}

export default App
