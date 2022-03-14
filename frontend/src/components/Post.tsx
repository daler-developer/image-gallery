import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import Tooltip from '@mui/material/Tooltip'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Badge from '@mui/material/Badge'
import { IPost, postsActions, selectPostByCreator } from '../redux/reducers/posts'
import useAuth from '../hooks/useAuth'
import { useMemo, useRef, useState } from 'react'
import useTypedDispatch from '../hooks/useTypedDispatch'
import client from '../utils/client'
import { IUser } from '../redux/reducers/users'
import { uiActions } from '../redux/reducers/ui'

interface IProps {
  post: IPost
}

const Post = ({ post }: IProps) => {
  const [usersLiked, setUsersLiked] = useState<IUser[]>([])
  const [isPopupHidden, setIsPopupHidden] = useState(true)
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)

  const downloadLinkRef = useRef<HTMLAnchorElement>(null!)

  const auth = useAuth()

  const createdByCurrentUser = useMemo(() => auth.currentUser._id === post.creator._id, [auth.currentUser])

  const dispatch = useTypedDispatch()

  const handleLikeBtnClick = () => {
    dispatch(postsActions.like(post._id))
  }

  const handleDislikeBtnClick = () => {
    dispatch(postsActions.dislike(post._id))
  }

  const handleDownlaodImageBtnClick = () => {
    downloadLinkRef.current.click()
  }

  const handleMouseEnter = async () => {
    setIsPopupHidden(false)
    setIsFetchingUsers(true)

    const { data } = await client.get(`/api/users?postLiked=${post._id}`)

    setUsersLiked(data.users)
    setIsFetchingUsers(false)
  }
  
  const handleMouseLeave = () => {
    setIsPopupHidden(true)
    setUsersLiked([])
  }

  const handleImageClick = () => {
    dispatch(uiActions.openViewImage(post.fileUrl))
  }

  const handleCommentBtnClick = () => {
    dispatch(uiActions.openModal('comments'))
    dispatch(uiActions.setCommentsViewingPostId(post._id))
  }

  const handleDeletePostBtnClick = () => {
    dispatch(postsActions.deletePost(post._id))
  }

  return <>
    <Tooltip title={post.desc}>
      <Paper
        elevation={2}
        sx={{
          p: '4px'
        }}
      >
        <Box
          component='img'
          src={post.fileUrl}
          sx={{
            width: '100%',
            borderRadius: '3px',
            aspectRatio: '3 / 2',
            cursor: 'pointer',
            ':hover': {
              transform: 'scale(1.03)'
            }
          }}
          onClick={handleImageClick}
        />
        <Box
          sx={{
            mt: '4px',
            display: 'flex'
          }}
        >
          <IconButton sx={{ mr: 'auto' }} onClick={handleDownlaodImageBtnClick}>
            <DownloadOutlinedIcon />
          </IconButton>

          <IconButton color='error' onClick={post.likedByCurrentUser ? handleDislikeBtnClick : handleLikeBtnClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ position: 'relative' }}>
            <Badge badgeContent={post.numLikes}>
              {
                post.likedByCurrentUser ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
            </Badge>
            {
              !isPopupHidden && (
                <Box
                  sx={{
                    borderRadius: '3px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '4px',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {
                    !isFetchingUsers ? (
                      usersLiked.map(({ username }) => (
                        <Typography key={username} variant='body2' color='white' sx={{ whiteSpace: 'nowrap' }}>
                          {username}
                        </Typography>
                      ))
                    ) : (
                      <CircularProgress disableShrink size={15} sx={{ color: 'white' }} />
                    )
                  }
                  {
                    !isFetchingUsers && !usersLiked.length && (
                      <Typography variant='body2' color='white' sx={{ whiteSpace: 'nowrap' }}>
                        Noone liked yet!
                      </Typography>
                    )
                  }
                </Box>
              )
            }
          </IconButton>

          <IconButton onClick={handleCommentBtnClick}>
            <Badge badgeContent={post.numComments}>
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
          
          {
            createdByCurrentUser && (
              <IconButton onClick={handleDeletePostBtnClick} color='error'>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            )
          }

        </Box>
      </Paper>
    </Tooltip>

    <Box component='a' href={post.fileUrl} download ref={downloadLinkRef} hidden />
  </>
}

export default Post
