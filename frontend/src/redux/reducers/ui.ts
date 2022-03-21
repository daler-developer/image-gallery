import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type SeverityTypes = 'success' | 'error'
type Modals = 'create-post'

interface IState {
  snackbar: {
    isOpen: boolean,
    message: string | null,
    severity: SeverityTypes | null
  },
  currentModal: Modals | null
}

const initialState: IState = {
  snackbar: {
    isOpen: false,
    message: null,
    severity: null
  },
  currentModal: null
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
    }
  },
  extraReducers: (builder) => {

  }
})

export const selectSnackbar = (state: RootState) => {
  return state.ui.snackbar
}

export const selectCurrentModal = (state: RootState) => {
  return state.ui.currentModal
}

export const uiActions = {
  ...uiSlice.actions,
}

const uiReducer = uiSlice.reducer

export default uiReducer
