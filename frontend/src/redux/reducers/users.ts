import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import client from '../../utils/client'
import { RootState } from '../store'
import { authActions, selectCurrentUser } from './auth'

const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const currentUser = selectCurrentUser(thunkAPI.getState() as RootState)

    const { data } = await client.get(`/api/users?exclude=["${currentUser._id}"]`)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

const updateProfile = createAsyncThunk('users/update-profile', async ({ username, avatar }: { username?: string, avatar?: File }, thunkAPI) => {
  try {
    const form = new FormData()

    username && form.append('username', username)
    avatar && form.append('avatar', avatar, avatar.name)

    const { data } = await client.patch(`/api/users/update-profile`, form)

    thunkAPI.dispatch(authActions.setCurrentUser(data.user))

    return data.user
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
  list: [],
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
      .addCase(authActions.login.fulfilled, (state, { payload }) => {
        state.list.push(payload.user)
      })
      .addCase(authActions.register.fulfilled, (state, { payload }) => {
        state.list.push(payload.user)
      })
      .addCase(fetchUsers.pending, (state, { payload }: any) => {
        state.isFetching = true
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }: any) => {
        state.isFetching = false
        state.list = payload.users
      })
      .addCase(fetchUsers.rejected, (state, { payload }: any) => {
        state.isFetching = false
        state.list = []
      })
      .addCase(updateProfile.pending, (state, { payload }: any) => {

      })
      .addCase(updateProfile.rejected, (state, { payload }: any) => {

      })
  }
})

export const selectUsers = (state: RootState) => {
  return state.users.list
}

export const selectUserById = (state: RootState, _id: string) => {
  return state.users.list.find((user) => user._id === _id)
}

export const selectIsUsersFetching = (state: RootState) => {
  return state.users.isFetching
}

export const usersActions = {
  ...usersSlice.actions,
  fetchUsers,
  updateProfile
}

const usersReducer = usersSlice.reducer

export default usersReducer
