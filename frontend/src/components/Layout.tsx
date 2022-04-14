import Box from '@mui/material/Box'
import Header from './Header'
import Container from '@mui/material/Container'

interface IProps {
  children: any
}

const Layout = ({ children }: IProps) => {
  return (
    <Box
      sx={{
        paddingTop: '50px'
      }}
    >
      <Header />
      <Container maxWidth='lg'>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
