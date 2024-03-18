import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    UsersReducer: UsersReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
