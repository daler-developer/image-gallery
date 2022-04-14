import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { authActions } from './auth'

type SeverityTypes = 'success' | 'error'
type Modals = 'create-post' | 'edit-profile' | 'comments'

interface IState {
  snackbar: {
    isOpen: boolean,
    message: string | null,
    severity: SeverityTypes | null
  },
  currentModal: Modals | null,
  selectedImageUrl: string | null,
  commentsViewingPostId: string | null
}

const initialState: IState = {
  snackbar: {
    isOpen: false,
    message: null,
    severity: null
  },
  currentModal: null,
  selectedImageUrl: null,
  commentsViewingPostId: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, { payload }: PayloadAction<Modals>) {
      state.currentModal = payload
    },
    closeModal(state) {
      state.currentModal = null
    },
    openSnackbar(state, { payload }: PayloadAction<{ severity: SeverityTypes, message: string }>) {
      state.snackbar = {
        isOpen: true,
        severity: payload.severity,
        message: payload.message
      }
    },
    closeSnackbar(state) {
      state.snackbar = {
        isOpen: false,
        severity: null,
        message: null
      }
    },
    openViewImage(state, { payload }: PayloadAction<string>) {
      state.selectedImageUrl = payload
    },
    closeViewImage(state) {
      state.selectedImageUrl = null
    },
    setSelectedImageUrl(state, { payload }: PayloadAction<string>) {
      state.selectedImageUrl = payload
    },
    setCommentsViewingPostId(state, { payload }: PayloadAction<string | null>) {
      state.commentsViewingPostId = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authActions.login.rejected, (state, { payload }: any) => {
        state.snackbar = {
          isOpen: true,
          severity: 'error',
          message: payload
        }
      })
      .addCase(authActions.register.rejected, (state, { payload }: any) => {
        state.snackbar = {
          isOpen: true,
          severity: 'error',
          message: payload
        }
      })

  }
})

export const selectSnackbar = (state: RootState) => {
  return state.ui.snackbar
}

export const selectCurrentModal = (state: RootState) => {
  return state.ui.currentModal
}

export const selectSelectedImageUrl = (state: RootState) => {
  return state.ui.selectedImageUrl
}

export const selectCommentsViewingPostId = (state: RootState) => {
  return state.ui.commentsViewingPostId
}

export const uiActions = {
  ...uiSlice.actions,
}

const uiReducer = uiSlice.reducer

export default uiReducer
