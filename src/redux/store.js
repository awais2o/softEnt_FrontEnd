import { configureStore } from '@reduxjs/toolkit'
import { GlobalAPI } from '../API/GlobalAPI'
import { RestrictedAPI } from '../API/RestrictedAPI'

export const store = configureStore({
  reducer: {
    [GlobalAPI.reducerPath]: GlobalAPI.reducer,
    [RestrictedAPI.reducerPath]: RestrictedAPI.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      GlobalAPI.middleware,
      RestrictedAPI.middleware
    )
})
