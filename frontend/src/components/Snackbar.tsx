import Alert from '@mui/material/Alert'
import MuiSnackbar from '@mui/material/Snackbar'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useTypedSelector from '../hooks/useTypesSelector'
import { selectSnackbar, uiActions } from '../redux/reducers/ui'

const Snackbar = () => {
  const snackbar = useTypedSelector((state) => selectSnackbar(state))

  const dispatch = useTypedDispatch()

  const handleClose = () => {
    dispatch(uiActions.closeSnackbar())
  }
  
  if (!snackbar.isOpen) {
    return null
  }

  return (
    <MuiSnackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.isOpen} onClose={handleClose} autoHideDuration={5000}>
      <Alert variant='filled' severity={snackbar.severity}>{snackbar.message}</Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
