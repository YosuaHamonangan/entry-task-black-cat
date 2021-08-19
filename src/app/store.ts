import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../reducer/event';
import filterReducer from '../reducer/filter';
import appReducer from '../reducer/app';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    filter: filterReducer,
    app: appReducer,
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
