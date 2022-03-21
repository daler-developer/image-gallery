import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../utils/client";
import { RootState } from "../store";
import { uiActions } from "./ui";


export const login = createAsyncThunk('auth/login', async ({ username, password }: { username: string, password: string}, thunkAPI) => {
  try {
    const { data } = await client.post('/api/users/login', { username, password })

    return data
  } catch (e) {
    const type = e.response.data.type

    return thunkAPI.rejectWithValue(type)
  }
})

export const register = createAsyncThunk('auth/register', async ({ username, password }: { username: string, password: string}, thunkAPI) => {
  try {
    const { data } = await client.post('/api/users/register', { username, password })

    return data
  } catch (e) {
    const type = e.response.data.type

    return thunkAPI.rejectWithValue(type)
  }
})

interface IState {
  currentUserId: string | null
}

const initialState: IState = {
  currentUserId: '6235e6cae175d7c6ec41e607'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserId(state, { payload }: PayloadAction<string>) {
      state.currentUserId = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentUserId = payload.user._id
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.currentUserId = payload.user._id
      })
  }
})

export const selectCurrentUserId = (state: RootState) => {
  return state.auth.currentUserId
}

export const authActions = {
  ...authSlice.actions,
  login,
  register
}

const authReducer = authSlice.reducer

export default authReducer
