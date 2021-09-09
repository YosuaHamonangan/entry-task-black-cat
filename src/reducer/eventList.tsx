import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents, getChannels } from '../api/event';
import { IReqGetEvents } from '../interfaces/api';
import { IEventListState } from '../interfaces/state';
import { getFilterDateRange } from '../util/eventFilter';
import { IEventData } from '../interfaces/data';

const initialState: IEventListState = {
  list: [],
  isLoading: false,
  hasMore: true,
  channels: [],
  filter: {
    date: null,
    channels: null,
    isValid: false,
    from: null,
    to: null,
  },
};

export const loadEventList = createAsyncThunk<IEventData[], void, { state: RootState }>(
  'eventList/load',
  async (_, { getState }) => {
    const rootState = getState();
    const state = selectEventList(rootState);
    const { list, filter } = state;

    const req: IReqGetEvents = {
      startIdx: list.length,
    };

    if (filter?.isValid) {
      const range = getFilterDateRange(filter);
      req.filter = {
        from: range?.from.toString(),
        to: range?.to.toString(),
        channels: filter.channels !== 'all' ? filter.channels!.map(({ id }) => id) : undefined,
      };
    }
    return await getEvents(req);
  },
);

export const loadChannels = createAsyncThunk('event/getChannels', getChannels);

export const eventSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    resetEvents: (state) => {
      state.list = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEventList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loadEventList.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length) {
        state.list = state.list.concat(action.payload);
      } else {
        state.hasMore = false;
      }
    });

    builder.addCase(loadChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
  },
});

export const { resetEvents } = eventSlice.actions;

export const selectEventList = (state: RootState) => state.eventList;
export const selectChannels = (state: RootState) => state.eventList.channels;

export default eventSlice.reducer;
