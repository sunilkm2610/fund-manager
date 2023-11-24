import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
// ...
import user from './slices/user';
import fundType from './slices/fundType';
export const store = configureStore({
  reducer: {
    user,
    fundType,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
