import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import useTypedDispatch from '../hooks/useTypedDispatch'
import useTypedSelector from '../hooks/useTypesSelector'
import { selectSelectedImageUrl, uiActions } from '../redux/reducers/ui'
import { useState } from 'react';

const ViewImage = () => {
  const [transform, setTransform] = useState({
    scale: 1
  })

  const imageUrl = useTypedSelector((state) => selectSelectedImageUrl(state))

  const dispatch = useTypedDispatch()

  const handleClickOutside = () => {
    dispatch(uiActions.closeViewImage())
  }

  const handleZoomInBtnClick = () => {
    setTransform({ ...transform, scale: transform.scale + 0.1 })
  }

  const handleZoomOutBtnClick = () => {
    setTransform({ ...transform, scale: transform.scale - 0.1 })
  }

  if (!imageUrl) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 'modal'
      }}
      onClick={handleClickOutside}
    >
      <Box
        component='img'
        src={imageUrl}
        onClick={(e: any) => e.stopPropagation()}
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${transform.scale})`
        }}
      />
      <Box
        onClick={(e: any) => e.stopPropagation()}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          border: '1px solid white',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px'
        }}
      >
        <IconButton sx={{ color: 'white' }} onClick={handleZoomInBtnClick}>
          <ZoomInOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }} onClick={handleZoomOutBtnClick}>
          <ZoomOutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ViewImage