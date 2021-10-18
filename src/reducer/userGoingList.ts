import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents } from '../api/event';
import { IReqGetEvents, IResGetEvents } from '../interfaces/api';
import { IUserGoingListState } from '../interfaces/state';
import { selectCurrentUser } from './user';

const initialState: IUserGoingListState = {
  list: [],
  isLoading: false,
  hasMore: true,
};

export const loadUserGoingList = createAsyncThunk<IResGetEvents, void, { state: RootState }>(
  'userGoingList/load',
  async (_, { getState }) => {
    const rootState = getState();

    const userState = selectCurrentUser(rootState);
    if (!userState) throw 'user not logged in';

    const state = selectUserGoingList(rootState);
    const { list } = state;

    const req: IReqGetEvents = {
      filter: {
        going: userState.id,
      },
      startIdx: list.length,
    };

    return await getEvents(req);
  },
);

export const userGoingSlice = createSlice({
  name: 'userGoingList',
  initialState,
  reducers: {
    resetUserGoing: (state) => {
      state.list = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserGoingList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadUserGoingList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loadUserGoingList.fulfilled, (state, action) => {
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

export const { resetUserGoing } = userGoingSlice.actions;

export const selectUserGoingList = (state: RootState) => state.userGoingList;

export default userGoingSlice.reducer;
