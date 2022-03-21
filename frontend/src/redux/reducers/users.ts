import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import client from '../../utils/client'
import { RootState } from '../store'
import { login, register } from './auth'

const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const { data } = await client.get(`/api/users`)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

export interface IUser {
  _id: string
  username: string
  avatarUrl?: string
}

interface IState {
  list: Array<IUser>,
  isFetching: boolean
}

const initialState: IState = {
  list: [{ _id: '6235e6cae175d7c6ec41e607', username: 'daler' }],
  isFetching: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      state.list = payload
    },
    removeUser(state, { payload }: PayloadAction<string>) {
      state.list = state.list.filter((user) => user._id !== payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.list.push(payload.user)
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.list.push(payload.user)
      })
      .addCase(fetchUsers.pending, (state, { payload }: any) => {
        state.isFetching = true
        state.list = []
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }: any) => {
        state.isFetching = true
        state.list = payload.users
      })
      .addCase(fetchUsers.rejected, (state, { payload }: any) => {
        state.isFetching = false
        state.list = []
      })
  }
})

export const selectUsers = (state: RootState) => {
  return state.users.list
}

export const selectUserById = (state: RootState, _id: string) => {
  return state.users.list.find((user) => user._id === _id)
}

export const usersActions = {
  ...usersSlice.actions,
  fetchUsers
}

const usersReducer = usersSlice.reducer

export default usersReducer
