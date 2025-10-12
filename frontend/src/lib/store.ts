import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import topicsReducer from './features/topicsSlice';
import progressReducer from './features/progressSlice';
export const store = ()=> {
  return configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
    progress: progressReducer,
  },
})
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];