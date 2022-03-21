import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import client from '../../utils/client'
import { RootState } from '../store'
import { login, register } from './auth'

interface IPost {
  desc: string,
  image: File
}


const createPost = createAsyncThunk('posts/createPost', async ({ desc, image }: IPost, thunkAPI) => {
  try {
    const form = new FormData()

    form.append('desc', desc)
    form.append('image', image, image.name)

    const { data } = await client.post(`/api/posts`, form)

    return { data }
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

interface IState {
  list: IPost[],
  selectedUserId: string | null,
  isFetching: boolean
}

const initialState: IState = {
  list: [],
  selectedUserId: null,
  isFetching: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedUser(state, { payload }: PayloadAction<string>) {
      state.selectedUserId = payload
    }
  },
  extraReducers: (builder) => {

  }
})

export const selectPosts = (state: RootState) => {
  return state.posts.list
}

export const selectSelectedUserId = (state: RootState) => {
  return state.posts.selectedUserId
}

export const postsActions = {
  ...postsSlice.actions,
  createPost
}

const postsReducer = postsSlice.reducer

export default postsReducer
