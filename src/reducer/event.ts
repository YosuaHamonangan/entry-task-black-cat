import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents, getChannels } from '../api/event';
import { IReqGetEvents } from '../interfaces/req';
import { IEventState, IFilterState } from '../interfaces/state';
import { getFilterDateRange } from '../util/eventFilter';

const initialState: IEventState = {
  list: [],
  channels: [],
};

export const loadEvent = createAsyncThunk('event/getEvent', async (id: string) => {
  return await getEvents({ id });
});

export const loadEvents = createAsyncThunk('event/getEvents', async (filter?: IFilterState) => {
  const req: IReqGetEvents = {};
  if (filter?.isValid) {
    const range = getFilterDateRange(filter);
    req.filter = {
      from: range?.from.toString(),
      to: range?.to.toString(),
      channels: filter.channels !== 'all' ? filter.channels! : undefined,
    };
  }
  return await getEvents(req);
});
export const loadChannels = createAsyncThunk('event/getChannels', getChannels);

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setIsLiked: (state, action: PayloadAction<{ id: string; val: boolean }>) => {
      const { id, val } = action.payload;
      const idx = state.list.findIndex((event) => event.id === id);
      if (idx === -1) return;

      state.list[idx] = Object.assign({}, state.list[idx], { isLiked: val });
    },
    setIsGoing: (state, action: PayloadAction<{ id: string; val: boolean }>) => {
      const { id, val } = action.payload;
      const idx = state.list.findIndex((event) => event.id === id);
      if (idx === -1) return;

      state.list[idx] = Object.assign({}, state.list[idx], { isGoing: val });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEvent.fulfilled, (state, action) => {
      state.list = state.list.concat(action.payload);
    });

    builder.addCase(loadEvents.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(loadChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
  },
});

export const { setIsLiked, setIsGoing } = eventSlice.actions;

export const selectEvents = (state: RootState) => state.event.list;
export const selectChannels = (state: RootState) => state.event.channels;

export default eventSlice.reducer;
