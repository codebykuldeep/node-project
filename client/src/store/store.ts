import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userState'

export const store = configureStore({
  reducer: {
    userState:userSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch