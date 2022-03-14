import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { IUser } from '../redux/reducers/users'
import Typography from '@mui/material/Typography'
import useTypedDispatch from '../hooks/useTypedDispatch'
import Avatar from '@mui/material/Avatar'
import { postsActions, selectSelectedUserId } from '../redux/reducers/posts'
import useTypedSelector from '../hooks/useTypesSelector'

interface IProps {
  user: IUser
}

const UserCard = ({ user }: IProps) => {
  const selectedUserId = useTypedSelector((state) => selectSelectedUserId(state))

  const dispatch = useTypedDispatch()

  const handleUserCardClick = () => {
    dispatch(postsActions.setSelectedUser(user._id))
  }
  
  return (
    <Paper
      variant='outlined'
      onClick={handleUserCardClick}
      sx={{
        flex: '0 0 150px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none',
        ...(selectedUserId === user._id && {
          borderColor: 'success.light'
        })
      }}
    >
      <Avatar src={user.avatarUrl} />
      <Typography variant='h6'>
        {user.username}
      </Typography>
    </Paper>
  )
}


export default UserCard
