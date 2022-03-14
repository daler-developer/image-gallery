import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import EditIcon from '@mui/icons-material/EditOutlined';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import useAuth from '../hooks/useAuth'
import { useMemo, useRef, useState } from 'react'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { uiActions } from '../redux/reducers/ui'
import logo from '../assets/logo.jpg'
import Divider from '@mui/material/Divider'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const dispatch = useTypedDispatch()

  const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl])

  const auth = useAuth()

  const handleAvatarClick = (e: any) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogoutBtnClick = () => {
    auth.logout()
  }

  const handleAddBtnClick = () => {
    dispatch(uiActions.openModal('create-post'))
  }

  const handleEditBtnClick = () => {
    dispatch(uiActions.openModal('edit-profile'))
  }
  
  return <>
    <Paper
      variant='outlined'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        bgcolor: 'common.light'
      }}
    >
      <Container
        maxWidth="lg" 
        sx={{
          height: 50
        }}
      >
        <Grid container sx={{ height: '100%'}} justifyContent='space-between' alignItems='center'>
          <Grid item component='img' src={logo} sx={{ height: '90%' }} />
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button size='small' variant='outlined' endIcon={<AddIcon />} onClick={handleAddBtnClick}>
                Post
              </Button>              
              <Avatar src={auth.currentUser.avatarUrl} onClick={handleAvatarClick} sx={{ cursor: 'pointer' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>

    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleMenuClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleLogoutBtnClick}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
      <MenuItem onClick={handleEditBtnClick}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit
      </MenuItem>
    </Menu>
  </>
}

export default Header
