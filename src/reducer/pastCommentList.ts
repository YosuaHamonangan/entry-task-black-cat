import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getChannels, getComments } from '../api/event';
import { IReqGetComments } from '../interfaces/api';
import { IPastCommentListState } from '../interfaces/state';
import { ICommentData } from '../interfaces/data';
import { selectCurrentUser } from './user';

const initialState: IPastCommentListState = {
  list: [],
  isLoading: false,
  hasMore: true,
};

export const loadPastCommentList = createAsyncThunk<ICommentData[], void, { state: RootState }>(
  'pastCommentList/load',
  async (_, { getState }) => {
    const rootState = getState();

    const userState = selectCurrentUser(rootState);
    if (!userState) throw 'user not logged in';

    const state = selectPastCommentList(rootState);
    const { list } = state;

    const req: IReqGetComments = {
      userId: userState.id,
      startIdx: list.length,
    };

    return await getComments(req);
  },
);

export const loadChannels = createAsyncThunk('event/getChannels', getChannels);

export const eventSlice = createSlice({
  name: 'pastCommentList',
  initialState,
  reducers: {
    resetPastComments: (state) => {
      state.list = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPastCommentList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadPastCommentList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loadPastCommentList.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length) {
        state.list = state.list.concat(action.payload);
      } else {
        state.hasMore = false;
      }
    });
  },
});

export const { resetPastComments } = eventSlice.actions;

export const selectPastCommentList = (state: RootState) => state.pastCommentList;

export default eventSlice.reducer;
