import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice'; // Import your player slice

const store = configureStore({
  reducer: {
    player: playerReducer, // Add more slices as needed
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // adding type for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;