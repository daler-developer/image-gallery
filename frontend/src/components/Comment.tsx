import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import useTypedSelector from '../hooks/useTypesSelector'
import { IUser, selectUserById } from '../redux/reducers/users'

export interface IComment {
  _id: string
  text: string
  creator: IUser
}

interface IProps {
  comment: IComment
}

const Comment = ({ comment }: IProps) => {
  return (
    <Box
      sx={{
        userSelect: 'none',
        display: 'grid',
        gridTemplateAreas: `
          "avatar username"
          "avatar text"
        `,
        gridTemplateColumn: 'min-content auto',
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: '4px'
      }}
    >
      <Avatar
        src={comment.creator.avatarUrl} 
        sx={{ gridArea: 'avatar' }}
      />
      <Typography variant='h6' sx={{ gridArea: 'username' }}>
        {comment.creator.username}
      </Typography>
      <Typography variant='body2' sx={{ gridArea: 'text' }}>
        {comment.text}
      </Typography>
    </Box>
  )
}

export default Comment
