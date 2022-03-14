import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import postsReducer from './reducers/posts'
import uiReducer from './reducers/ui'
import usersReducer from './reducers/users'


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    ui: uiReducer,
    posts: postsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
