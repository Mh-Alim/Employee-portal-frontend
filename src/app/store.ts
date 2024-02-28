import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter/counterSlice'
// ...

export const store = configureStore({
  reducer: {
    count: counterSlice
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch