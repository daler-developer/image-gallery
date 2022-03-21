import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import useTypedSelector from '../hooks/useTypesSelector'
import { selectUsers } from '../redux/reducers/users'

import Header from './Header'
import UserCard from './UserCard'
import { useState } from 'react'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const users = useTypedSelector((state) => selectUsers(state))

  return (
    <Box>
      <Header />
      <Container maxWidth='lg'>
        <Box
          sx={{
            marginTop: '60px',
            overflowX: 'auto',
            display: 'flex',
            columnGap: '10px'
          }}
        >
          {
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
              />
            ))
          }
        </Box>
        <Box>
          <TextField
            size='small'
            fullWidth
            placeholder="Search"
            sx={{ mt: '10px' }}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Home
