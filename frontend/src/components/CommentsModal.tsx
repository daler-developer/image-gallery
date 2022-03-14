import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import useTypedSelector from "../hooks/useTypesSelector"
import { selectCommentsViewingPostId, selectCurrentModal } from "../redux/reducers/ui"
import Modal from "./Modal"
import client from "../utils/client"
import { postsActions, selectPostByid } from "../redux/reducers/posts"
import { uiActions } from '../redux/reducers/ui'
import Comment, { IComment } from "./Comment"
import { useFormik } from "formik"
import * as yup from 'yup'
import useTypedDispatch from "../hooks/useTypedDispatch"



const CommentsModal = () => {
  const [comments, setComments] = useState<Array<IComment>>([])
  const [isFetching, setIsFetching] = useState(false)

  const isOpen = useTypedSelector((state) => selectCurrentModal(state)) === 'comments'
  const postViewing = useTypedSelector((state) => selectPostByid(state, selectCommentsViewingPostId(state)))

  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (isOpen) {
      fetchComments()
    } else {
      setComments([])
      form.resetForm()
    }
  }, [isOpen])

  const form = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: yup.object().shape({
      text: yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(100, 'Too long'),
    }),
    async onSubmit(v) {
      await createComment(v.text)
      form.resetForm()
      dispatch(uiActions.closeModal())
    }
  })

  const fetchComments = async () => {
    try {
      setIsFetching(true)

      const { data } = await client.get(`/api/posts/${postViewing._id}/comments`)

      setComments(data.comments)
    } catch (e) {
      alert('error')
    } finally {
      setIsFetching(false)
    }
  }

  const createComment = async (text: string) => {
    try {
      const { data } = await client.post(`/api/posts/${postViewing._id}/comments`, { text })

      setComments([...comments, data.comment])
      dispatch(postsActions.addComment({ postId: postViewing._id, commentId: data.comment._id }))
    } catch (e) {
      alert('error createComment')
    }
  }

  return (
    <Modal isOpen={isOpen} title='Comments'>

      {
        isFetching ? (
          <CircularProgress sx={{ margin: '0 auto'}} />
        ) : (
          <Box sx={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '4px' }}>
            {
              comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            }
          </Box>
        )
      }

      {
        !isFetching && !comments.length && (
          <Typography variant='body2'>
            No comments :(
          </Typography>
        )
      }

      <Box
        component='form'
        onSubmit={form.handleSubmit}
        sx={{
          display: 'flex',
          mt: 2
        }}
      >
        <TextField
          placeholder='Text'
          size='small'
          name='text'
          error={form.touched.text && Boolean(form.errors.text)}
          sx={{ flex: '1 0 0' }}
          value={form.values.text}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        <Button type='submit' variant='contained' size='small'>
          Send
        </Button>
      </Box>
    </Modal>
  )
}

export default CommentsModal
