import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getComments, postComment } from '../api/event';
import { IReqGetComments, IReqPostComment, IResPostComment } from '../interfaces/api';
import { ICommentListState } from '../interfaces/state';
import { ICommentData } from '../interfaces/data';
import { selectCurrentEvent } from './event';
import { selectCurrentUser } from './user';

const initialState: ICommentListState = {
  list: [],
  isLoading: false,
  hasMore: true,
};

export const loadCommentList = createAsyncThunk<ICommentData[], void, { state: RootState }>(
  'commentList/load',
  async (_, { getState }) => {
    const rootState = getState();

    const eventState = selectCurrentEvent(rootState);
    if (!eventState) throw 'event not found';

    const state = selectCommentList(rootState);
    const { list } = state;

    const req: IReqGetComments = {
      eventId: eventState.id,
      startIdx: list.length,
    };

    return await getComments(req);
  },
);

export const createComment = createAsyncThunk<
  IResPostComment,
  { comment: string; targetId: string | null },
  { state: RootState }
>('event/createComment', async ({ comment, targetId }, { getState }) => {
  const rootState = getState();

  const eventState = selectCurrentEvent(rootState);
  if (!eventState) throw 'event not found';

  const userState = selectCurrentUser(rootState);
  if (!userState) throw 'user not logged in';

  const state = selectCommentList(rootState);
  const { list } = state;

  const req: IReqPostComment = {
    eventId: eventState.id,
    userId: eventState.id,
    comment,
    targetId,
    time: new Date().toString(),
    startIdx: list.length,
  };
  return await postComment(req);
});

export const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.list = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCommentList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCommentList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loadCommentList.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length) {
        state.list = state.list.concat(action.payload);
      } else {
        state.hasMore = false;
      }
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      const { comments } = action.payload;
      state.list = comments;
    });
  },
});

export const { resetComments } = commentSlice.actions;

export const selectCommentList = (state: RootState) => state.commentList;

export default commentSlice.reducer;
