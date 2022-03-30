import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../utils/client";
import { RootState } from "../store";
import { uiActions } from "./ui";
import { IUser } from "./users";


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
  currentUser: IUser | null
}

const initialState: IState = {
  currentUser: {
    _id: '6235e6cae175d7c6ec41e607',
    username: 'daler',
    avatarUrl: '/api/uploads/avatars/1648125205414-409062523__download.jpg'
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }: PayloadAction<IUser | null>) {
      state.currentUser = null
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
  }
})

export const selectCurrentUser = (state: RootState) => {
  return state.auth.currentUser
}

export const authActions = {
  ...authSlice.actions,
  login,
  register
}

const authReducer = authSlice.reducer

export default authReducer
