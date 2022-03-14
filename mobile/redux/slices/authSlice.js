import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUserId: 'id001'
  },
  reducers: {

  }
})

export const selectCurrentUserId = (state) => {
  return state.auth.currentUserId
}

export const authActions = {
  ...authSlice.actions
}

export const authReducer = authSlice.reducer
