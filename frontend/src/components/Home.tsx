import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import useTypedSelector from '../hooks/useTypesSelector'
import { selectIsUsersFetching, selectUsers, usersActions } from '../redux/reducers/users'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useAuth from '../hooks/useAuth'
import { selectSelectedUserId, postsActions, selectPosts, selectIsPostsFetching } from '../redux/reducers/posts'
import UserCard from './UserCard'
import { useEffect, useMemo, useState } from 'react'
import Post from './Post'
import EditProfileModal from './EditProfileModal'
import CreatePostModal from './CreatePostModal'
import CommentsModal from './CommentsModal'
import FullScreenLoader from './FullScreenLoader'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const dispatch = useTypedDispatch()

  const auth = useAuth()

  const users = useTypedSelector((state) => selectUsers(state))
  const posts = useTypedSelector((state) => selectPosts(state))
  const selectedUserId = useTypedSelector((state) => selectSelectedUserId(state))
  const isPostsFetching = useTypedSelector((state) => selectIsPostsFetching(state))
  const isUsersFetching = useTypedSelector((state) => selectIsUsersFetching(state))

  const filteredPosts = useMemo(() => posts.filter((post) => post.desc.includes(searchInputValue)), [posts, searchInputValue])

  useEffect(() => {
    if (selectedUserId) {
      dispatch(postsActions.fetchPosts(selectedUserId))
    }
  }, [selectedUserId])

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(usersActions.fetchUsers())
      dispatch(postsActions.setSelectedUser(auth.currentUser._id))
    } else {
      dispatch(postsActions.setSelectedUser(null))
      dispatch(usersActions.setUsers([]))
      dispatch(postsActions.setPosts([]))
    }
  }, [])

  const loader = (
    <CircularProgress
      disableShrink
      color='secondary'
      sx={{
        display: 'block',
        mt: '10px',
        mx: 'auto'
      }}
    />
  )

  if (isPostsFetching && isUsersFetching) {
    return loader
  }

  return <>
    <Box
      sx={{
        marginTop: '10px',
        overflowX: 'auto',
        display: 'flex',
        columnGap: '10px',
        height: '150px'
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

    <Divider sx={{ mt: '10px' }} />

    {
      isPostsFetching ? loader : <>
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
      </>
    }
    <CommentsModal />
    <EditProfileModal />
    <CreatePostModal />
  </>
}

export default Home
