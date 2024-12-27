import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/Auth';
import cartReducer from './features/Cart/Cart'; // Import cartReducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add cartReducer to the store
  },
});