import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { uiActions } from '../redux/reducers/ui'

interface IProps {
  isOpen: boolean
  title: string
  children: any
  [key: string]: any
}

const Modal = ({ isOpen, title, children, ...rest }: IProps) => {
  const dispatch = useTypedDispatch()

  const handleClose = () => dispatch(uiActions.closeModal())

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs' {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
