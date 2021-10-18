import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents } from '../api/event';
import { IReqGetEvents, IResGetEvents } from '../interfaces/api';
import { IUserLikesListState } from '../interfaces/state';
import { selectCurrentUser } from './user';

const initialState: IUserLikesListState = {
  list: [],
  isLoading: false,
  hasMore: true,
};

export const loadUserLikesList = createAsyncThunk<IResGetEvents, void, { state: RootState }>(
  'userLikesList/load',
  async (_, { getState }) => {
    const rootState = getState();

    const userState = selectCurrentUser(rootState);
    if (!userState) throw 'user not logged in';

    const state = selectUserLikesList(rootState);
    const { list } = state;

    const req: IReqGetEvents = {
      filter: {
        likes: userState.id,
      },
      startIdx: list.length,
    };

    return await getEvents(req);
  },
);

export const userLikesSlice = createSlice({
  name: 'userLikesList',
  initialState,
  reducers: {
    resetUserLikes: (state) => {
      state.list = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserLikesList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadUserLikesList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loadUserLikesList.fulfilled, (state, action) => {
      state.isLoading = false;
      const { data } = action.payload;
      if (data.length) {
        state.list = state.list.concat(data);
      } else {
        state.hasMore = false;
      }
    });
  },
});

export const { resetUserLikes } = userLikesSlice.actions;

export const selectUserLikesList = (state: RootState) => state.userLikesList;

export default userLikesSlice.reducer;
