import { configureStore } from '@reduxjs/toolkit'
import headerSlice from './slices/headers'
import accountSlice from './slices/account'

export const makeStore = () => {
  return configureStore({
    reducer: {
      headers: headerSlice,
      account: accountSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']