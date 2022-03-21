import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import * as yup from 'yup'
import { selectCurrentModal, uiActions } from '../redux/reducers/ui'
import useTypedSelector from '../hooks/useTypesSelector'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { postsActions } from '../redux/reducers/posts'



const CreatePostModal = () => {
  const [image, setImage] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null!)

  const dispatch = useTypedDispatch()

  const form = useFormik({
    initialValues: {
      desc: ''
    },
    validationSchema: yup.object().shape({
      desc: yup.string().min(3, 'Too short').max(15, 'Too long')
    }),
    onSubmit(v) {
      dispatch(postsActions.createPost({ desc: v.desc, image }))
    }
  })

  const currentModal = useTypedSelector((state) => selectCurrentModal(state))

  const isOpen = useMemo(() => currentModal === 'create-post', [currentModal])
  const imageUrl = useMemo(() => image ? URL.createObjectURL(image) : null, [image])

  const handleClose = () => {
    dispatch(uiActions.closeModal())
  }

  const handleUploadBtnClick = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0]

    setImage(file)
  }

  const handleRemoveImageBtnClick = () => {
    fileInputRef.current.value = null
    setImage(null)
  }

  return <>
    <Dialog open={isOpen} onClose={handleClose}>
      <Box
        component='form'
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',

        }}
        noValidate
        onSubmit={form.handleSubmit}
      >
        <TextField
          label="Description"
          name="desc"
          value={form.values.desc}
          onChange={form.handleChange}
          error={form.touched.desc && Boolean(form.errors.desc)}
          helperText={form.touched.desc && form.errors.desc}
        />
        {
          image ? (
            <Box
              sx={{
                position: 'relative'
              }}
            >
              <Box
                component='img'
                src={imageUrl}
                sx={{
                  borderRadius: '3px',
                  mt: '3px'
                }}
              />
              <IconButton
                color='error'
                sx={{ position: 'absolute', top: 5, right: 5 }}
                onClick={handleRemoveImageBtnClick}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Button type='button' endIcon={<PhotoCamera />} sx={{ mt: '3px' }} onClick={handleUploadBtnClick}>
              Upload
            </Button>
          )
        }
        <Button
          size='small'
          type='submit'
          variant='contained'
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Dialog>

    <input type="file" hidden ref={fileInputRef} onChange={handleFileInputChange} />
  </>
}

export default CreatePostModal
