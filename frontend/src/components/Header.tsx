import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import useAuth from '../hooks/useAuth'
import { useMemo, useRef, useState } from 'react'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { uiActions } from '../redux/reducers/ui'
import logo from '../assets/logo.jpg'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const dispatch = useTypedDispatch()

  const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl])

  const openMenuBtnRef = useRef<HTMLButtonElement>(null!)

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
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        boxShadow: 1,
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
            <Stack direction='row' spacing={0.5}>
              <IconButton onClick={handleAddBtnClick}>
                <AddIcon />
              </IconButton>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer' }}
              >
                D
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogoutBtnClick}>Logout</MenuItem>
              </Menu>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Header
