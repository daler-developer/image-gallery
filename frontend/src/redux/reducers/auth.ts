import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../utils/client";
import { RootState } from "../store";
import { uiActions } from "./ui";
import { IUser } from "./users";

const verifyToken = createAsyncThunk('auth/verify-token', async (token: string, thunkAPI) => {
  try {
    const { data } = await client.post('/api/users/verify-token', { token })

    return data.user
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message as string)
  }
})

const login = createAsyncThunk('auth/login', async ({ username, password }: { username: string, password: string}, thunkAPI) => {
  try {
    const { data } = await client.post('/api/users/login', { username, password })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message as string)
  }
})

const register = createAsyncThunk('auth/register', async ({ username, password }: { username: string, password: string}, thunkAPI) => {
  try {
    const { data } = await client.post('/api/users/register', { username, password })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message as string)
  }
})

interface IState {
  currentUser: IUser | null
  isVerifyingToken: boolean
}

const initialState: IState = {
  currentUser: null,
  isVerifyingToken: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }: PayloadAction<IUser | null>) {
      state.currentUser = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentUser = payload.user
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.currentUser = payload.user
      })
      .addCase(verifyToken.pending, (state, { payload }) => {
        state.isVerifyingToken = true
      }) 
      .addCase(verifyToken.fulfilled, (state, { payload }) => {
        state.currentUser = payload
        state.isVerifyingToken = false
      }) 
      .addCase(verifyToken.rejected, (state, { payload }) => {
        state.isVerifyingToken = false
      }) 
  }
})

export const selectCurrentUser = (state: RootState) => {
  return state.auth.currentUser
}

export const selectIsVerifyingToken = (state: RootState) => {
  return state.auth.isVerifyingToken
}

export const authActions = {
  ...authSlice.actions,
  login,
  register,
  verifyToken
}

const authReducer = authSlice.reducer

export default authReducer
