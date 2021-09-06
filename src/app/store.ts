import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../reducer/event';
import filterReducer from '../reducer/filter';
import appReducer from '../reducer/app';
import userReducer from '../reducer/user';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    filter: filterReducer,
    app: appReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
