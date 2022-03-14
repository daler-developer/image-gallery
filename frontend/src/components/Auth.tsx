import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useTypedSelector from '../hooks/useTypesSelector'
import useAuth from '../hooks/useAuth'


const Auth = () => {
  const [params, setParams] = useSearchParams()

  const navigate = useNavigate()

  const auth = useAuth()

  const tab = useMemo<string>(() => params.get('tab'), [params.get('tab')])

  useEffect(() => {
    if (!tab) {
      setParams({ tab: 'login' })
    }
  }, [])

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(15, 'Too long'),
      password: yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(15, 'Too long'),
    }),
    onSubmit(v) {
      if (tab === 'login') {
        navigate('/home')
        auth.login(v.username, v.password)
      } else if (tab === 'register') {
        auth.register(v.username, v.password)
      }
    }
  })

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          {
            tab === 'login' ? 'Login' : 'Register'
          }
        </Typography>
        <Box component="form" onSubmit={form.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            error={form.touched.username && Boolean(form.errors.username)}
            helperText={form.touched.username && form.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            error={form.touched.password && Boolean(form.errors.password)}
            helperText={form.touched.password && form.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {
              tab === 'register' ? 'Register' : 'Login'
            }
          </Button>
          {
            tab === 'login' && (
              <Link to="/auth?tab=register">
                <Typography variant="body1" textAlign='center' color="primary">
                  Don't have an account? Register
                </Typography>
              </Link>
            )
          }
          {
            tab === 'register' && (
              <Link to="/auth?tab=login">
                <Typography variant="body1" textAlign='center' color="primary">
                  Already have an account? Login
                </Typography>
              </Link>
            )
          }
        </Box>
      </Box>
    </Container>
  )
}

export default Auth
