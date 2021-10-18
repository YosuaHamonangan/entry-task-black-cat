import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../reducer/event';
import eventListReducer from '../reducer/eventList';
import commentListReducer from '../reducer/commentList';
import pastCommentListReducer from '../reducer/pastCommentList';
import userGoingListReducer from '../reducer/userGoingList';
import userLikesListReducer from '../reducer/userLikesList';
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
    userGoingList: userGoingListReducer,
    userLikesList: userLikesListReducer,
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
