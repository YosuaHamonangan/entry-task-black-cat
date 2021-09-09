import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents, getChannels } from '../api/event';
import { IReqGetEvents } from '../interfaces/api';
import { IEventListState, IFilterState } from '../interfaces/state';
import { getFilterDateRange, validateFilter } from '../util/eventFilter';
import { IChannelData, IEventData } from '../interfaces/data';
import { DateFilter } from '../enum/eventFilter';

const initialState: IEventListState = {
  list: [],
  isLoading: false,
  hasMore: true,
  channelList: [],
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
    setDateFilter: (state, action: PayloadAction<{ date: DateFilter | null }>) => {
      const { date } = action.payload;
      state.filter.date = date;
      state.filter.isValid = validateFilter(state.filter);
    },
    setChannelFilter: (
      state,
      action: PayloadAction<{ channels: 'all' | IChannelData[] | null }>,
    ) => {
      const { channels } = action.payload;
      state.filter.channels = channels;
      state.filter.isValid = validateFilter(state.filter);
    },
    setFilter: (state, action: PayloadAction<IFilterState>) => {
      state.filter = { ...state.filter };
      Object.assign(state.filter, action.payload);
      state.filter.isValid = validateFilter(state.filter);
    },
    clearFilter: (state) => {
      state.filter = {
        date: null,
        channels: null,
        isValid: false,
      };
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
      state.channelList = action.payload;
    });
  },
});

export const { resetEvents, setFilter, clearFilter } = eventSlice.actions;

export const selectEventList = (state: RootState) => state.eventList;
export const selectChannels = (state: RootState) => state.eventList.channelList;
export const selectFilter = (state: RootState) => state.eventList.filter;

export default eventSlice.reducer;
