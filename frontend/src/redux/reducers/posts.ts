import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import client from '../../utils/client'
import { RootState } from '../store'
import { selectCurrentUser } from './auth'
import { IUser } from './users'

const createPost = createAsyncThunk('posts/create', async ({ desc, image }: { desc: string, image: File }, thunkAPI) => {
  try {
    const currentUser = selectCurrentUser(thunkAPI.getState() as RootState)
    const selectedUserId = selectSelectedUserId(thunkAPI.getState() as RootState)

    const form = new FormData()

    form.append('desc', desc)
    form.append('image', image, image.name)

    const { data } = await client.post(`/api/posts`, form)

    if (currentUser._id === selectedUserId) {
      thunkAPI.dispatch(postsActions.addPost(data.post))
    }

    return data.post
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

const deletePost = createAsyncThunk('posts/delete', async (postId: string, thunkAPI) => {
  try {
    await client.delete(`/api/posts/${postId}`)

    return postId 
  } catch (e) {
    return 'test'
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
    await client.patch(`/api/posts/${postId}/like`)

    return postId
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

const dislike = createAsyncThunk('posts/dislike', async (postId: string, thunkAPI) => {
  try {
    await client.patch(`/api/posts/${postId}/dislike`)

    return postId
  } catch (e) {
    return thunkAPI.rejectWithValue('error')
  }
})

export interface IPost {
  _id: string
  desc: string
  fileUrl: string
  creator: IUser
  numLikes: number
  numComments: number
  likedByCurrentUser: boolean
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
  isFetching: true,
  isCreating: false,
  isLiking: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload } : PayloadAction<Array<IPost>>) {
      state.list = payload
    },
    addPost(state, { payload }: PayloadAction<IPost>) {
      state.list.push(payload)
    },
    setSelectedUser(state, { payload }: PayloadAction<string>) {
      state.selectedUserId = payload
    },
    addComment(state, { payload }) {
      
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
      .addCase(like.fulfilled, (state, { payload }: PayloadAction<string>) => {
        const i = state.list.findIndex((post) => post._id === payload)

        state.isLiking = false
        state.list[i].likedByCurrentUser = true
        state.list[i].numLikes++
      })
      .addCase(like.rejected, (state, { payload }) => {
        state.isLiking = false
      })
      .addCase(dislike.fulfilled, (state, { payload }: PayloadAction<string>) => {
        const i = state.list.findIndex((post) => post._id === payload)

        state.list[i].likedByCurrentUser = false
        state.list[i].numLikes--
      })
      .addCase(deletePost.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.list = state.list.filter((post) => post._id !== payload)
      })
  }
})

export const selectPosts = (state: RootState) => {
  return state.posts.list
}

export const selectPostByid = (state: RootState, _id: string) => {
  return state.posts.list.find((post) => post._id === _id)
}

export const selectPostByCreator = (state: RootState, creatorId: string) => {
  return state.posts.list.find((post) => post.creator._id === creatorId)
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
  deletePost,
  fetchPosts,
  like,
  dislike
}

const postsReducer = postsSlice.reducer

export default postsReducer
