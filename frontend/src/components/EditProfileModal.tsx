import Modal from './Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import * as yup from 'yup'
import { selectCurrentModal } from '../redux/reducers/ui'
import useTypedSelector from '../hooks/useTypesSelector'
import useAuth from '../hooks/useAuth'
import { useFormik } from 'formik'
import useTypedDispatch from '../hooks/useTypedDispatch'
import { usersActions } from '../redux/reducers/users'
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react'


const EditProfileModal = () => {
  const [image, setImage] = useState<File | null>(null)

  const imageUrl = useMemo(() => image && URL.createObjectURL(image) || null, [image])

  const fileInputRef = useRef<HTMLInputElement>(null!)

  const { currentUser } = useAuth()

  const dispatch = useTypedDispatch()

  const isOpen = useTypedSelector((state) => selectCurrentModal(state)) === 'edit-profile'

  const form = useFormik({
    initialValues: {
      username: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(15, 'Too long'),
    }),
    onSubmit(v) {
      const changes: { username?: string, avatar?: File } = {}

      if (v.username !== currentUser.username) {
        changes.username = v.username
      }

      if (image) {
        changes.avatar = image
      }

      if (!Object.keys(changes).length) {
        return alert('no changes')
      }

      dispatch(usersActions.updateProfile(changes))
    }
  })

  useEffect(() => {
    if (isOpen) {
      form.setValues({ username: currentUser.username })
    }
  }, [isOpen])

  const handleFileInputChange = (e: SyntheticEvent) => {
    setImage((e.target as HTMLInputElement).files[0])
  }

  return <>
    <Modal title='Edit' isOpen={isOpen}>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={form.handleSubmit}>

        <Box
          sx={{
            display: 'flex',
            gap: '2px'
          }}
        >
          <Avatar src={image ? imageUrl : currentUser.avatarUrl} />
          <Button type='button' sx={{ ml: 'auto' }} onClick={() => fileInputRef.current.click()}>
            Replace
          </Button>
          <Button type='button' color='error'>
            Remove
          </Button>
        </Box>

        <TextField
          name='username'
          size='small'
          placeholder='Username'
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.username && Boolean(form.errors.username)}
          helperText={form.touched.username && form.errors.username}
          sx={{ mt: '5px' }}
        />

        <Button type='submit' sx={{ mt: '20px' }} variant='contained' size='small'>
          Edit
        </Button>
      </Box>
    </Modal>

    <Box component='input' type='file' onChange={handleFileInputChange} ref={fileInputRef} hidden />
  </>
}

export default EditProfileModal
