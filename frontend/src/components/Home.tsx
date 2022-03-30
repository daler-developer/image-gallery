import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import useTypedSelector from '../hooks/useTypesSelector'
import { selectUsers, usersActions } from '../redux/reducers/users'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useAuth from '../hooks/useAuth'
import { selectSelectedUserId, postsActions, selectPosts, selectIsPostsFetching } from '../redux/reducers/posts'
import Header from './Header'
import UserCard from './UserCard'
import { useEffect, useMemo, useState } from 'react'
import Post from './Post'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const dispatch = useTypedDispatch()

  const auth = useAuth()

  const users = useTypedSelector((state) => selectUsers(state))
  const selectedUserId = useTypedSelector((state) => selectSelectedUserId(state))
  const posts = useTypedSelector((state) => selectPosts(state))
  const isPostsFetching = useTypedSelector((state) => selectIsPostsFetching(state))

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.desc.includes(searchInputValue))
  }, [posts, searchInputValue])

  useEffect(() => {
    if (selectedUserId) {
      dispatch(postsActions.fetchPosts(selectedUserId))
    }
  }, [selectedUserId])

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(usersActions.fetchUsers())
      dispatch(postsActions.setSelectedUser(auth.currentUser._id))
    }
  }, [auth.isAuthenticated])

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
          <UserCard user={auth.currentUser} />
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
        {
          isPostsFetching ? (
            <CircularProgress
              disableShrink
              color='secondary'
              sx={{
                display: 'block',
                mt: '10px',
                mx: 'auto'
              }}
            />
          ) : (
            <Box
              sx={{
                mt: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '6px'
              }}
            >
              {
                filteredPosts.map((post) => (
                  <Post
                    key={post._id}
                    post={post}
                  />
                ))
              }
            </Box>
          )
        }
      </Container>
    </Box>
  )
}

export default Home
