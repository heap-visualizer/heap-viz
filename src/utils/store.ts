import { configureStore } from '@reduxjs/toolkit';
//import reducers
import authReducer from '../slices/authentication';
import messageReducer from '../slices/messages';
//bundle reducers 
const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;