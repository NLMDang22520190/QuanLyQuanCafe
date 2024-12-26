import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/Auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});