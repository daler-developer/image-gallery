import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import client from '../../utils/client'
import { RootState } from '../store'
import { login, register } from './auth'

const createPost = createAsyncThunk('posts/create', async ({ desc, image }: { desc: string, image: File }, thunkAPI) => {
  try {
    const form = new FormData()

    form.append('desc', desc)
    form.append('image', image, image.name)

    const { data } = await client.post(`/api/posts`, form)

    return data.post
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

const fetchPosts = createAsyncThunk('posts/fetch', async (userId: string, thunkAPI) => {
  try {
    const { data } = await client.get(`/api/posts?creator=${userId}`)

    return data.posts
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

const like = createAsyncThunk('posts/like', async (postId: string, thunkAPI) => {
  try {
    const { data } = await client.patch(`/api/posts/${postId}/like`)

    console.log(data)

    return data.post
  } catch (e) {
    console.log(e.response)
    return thunkAPI.rejectWithValue('error')
  }
})

const dislike = createAsyncThunk('posts/dislike', async (postId: string, thunkAPI) => {
  try {
    const { data } = await client.patch(`/api/posts/${postId}/dislike`)

    console.log(data)

    return data.post
  } catch (e) {
    console.log(e.response)
    return thunkAPI.rejectWithValue('error')
  }
})

export interface IPost {
  _id: string
  desc: string
  fileUrl: string
  creator: string
  likes: string[]
  comments: string[]
}

interface IState {
  list: IPost[],
  selectedUserId: string | null,
  isFetching: boolean,
  isCreating: boolean,
  isLiking: boolean
}

const initialState: IState = {
  list: [],
  selectedUserId: null,
  isFetching: false,
  isCreating: false,
  isLiking: false
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
    builder
      .addCase(fetchPosts.pending, (state, { payload }) => {
        state.list = []
        state.isFetching = true
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }: PayloadAction<IPost[]>) => {
        state.isFetching = false
        state.list = payload
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.isFetching = false
      })
      .addCase(createPost.pending, (state, { payload }) => {
        state.isCreating = true
      })
      .addCase(createPost.fulfilled, (state, { payload }: PayloadAction<IPost[]>) => {
        state.isCreating = false
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.isCreating = false
      })
      .addCase(like.pending, (state, { payload }) => {
        state.isLiking = true
      })
      .addCase(like.fulfilled, (state, { payload }: PayloadAction<IPost>) => {
        const i = state.list.findIndex((post) => post._id === payload._id)

        state.isLiking = false
        state.list[i] = payload
      })
      .addCase(like.rejected, (state, { payload }) => {
        state.isLiking = false
      })
      .addCase(dislike.fulfilled, (state, { payload }: PayloadAction<IPost>) => {
        const i = state.list.findIndex((post) => post._id === payload._id)

        state.list[i] = payload
      })
  }
})

export const selectPosts = (state: RootState) => {
  return state.posts.list
}

export const selectPostByCreator = (state: RootState, creator: string) => {
  return state.posts.list.find((post) => post.creator === creator)
}

export const selectIsLiking = (state: RootState) => {
  return state.posts.isLiking
}

export const selectSelectedUserId = (state: RootState) => {
  return state.posts.selectedUserId
}

export const selectIsPostsFetching = (state: RootState) => {
  return state.posts.isFetching
}

export const postsActions = {
  ...postsSlice.actions,
  createPost,
  fetchPosts,
  like,
  dislike
}

const postsReducer = postsSlice.reducer

export default postsReducer
