import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../reducer/event';
import eventListReducer from '../reducer/eventList';
import commentListReducer from '../reducer/commentList';
import pastCommentListReducer from '../reducer/pastCommentList';
import appReducer from '../reducer/app';
import userReducer from '../reducer/user';

export const store = configureStore({
  reducer: {
    eventList: eventListReducer,
    commentList: commentListReducer,
    pastCommentList: pastCommentListReducer,
    event: eventReducer,
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
