import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents, getChannels, getComments } from '../api/event';
import { IReqGetEvents } from '../interfaces/req';
import { IEventState, IFilterState } from '../interfaces/state';
import { getFilterDateRange } from '../util/eventFilter';
import { IEventData } from '../interfaces/res';

const initialState: IEventState = {
  list: null,
  channels: null,
  current: null,
  comments: null,
};

export const loadEvent = createAsyncThunk('event/getEvent', async (id: string) => {
  return await getEvents({ id });
});

export const loadComments = createAsyncThunk('event/getComment', async (eventId: string) => {
  return await getComments({ eventId });
});

export const loadEvents = createAsyncThunk('event/getEvents', async (filter?: IFilterState) => {
  const req: IReqGetEvents = {};
  if (filter?.isValid) {
    const range = getFilterDateRange(filter);
    req.filter = {
      from: range?.from.toString(),
      to: range?.to.toString(),
      channels: filter.channels !== 'all' ? filter.channels!.map(({ id }) => id) : undefined,
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
      if (!state.list) return;

      const { id, val } = action.payload;
      const idx = state.list.findIndex((event) => event.id === id);
      if (idx === -1) return;

      state.list[idx] = Object.assign({}, state.list[idx], { isLiked: val });
    },
    setIsGoing: (state, action: PayloadAction<{ id: string; val: boolean }>) => {
      if (!state.list) return;

      const { id, val } = action.payload;
      const idx = state.list.findIndex((event) => event.id === id);
      if (idx === -1) return;

      state.list[idx] = Object.assign({}, state.list[idx], { isGoing: val });
    },
    setCurrentEvent: (state, action: PayloadAction<IEventData>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEvent.fulfilled, (state, action) => {
      state.current = action.payload[0];
    });

    builder.addCase(loadEvents.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(loadChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export const { setIsLiked, setIsGoing, setCurrentEvent } = eventSlice.actions;

export const selectCurrentEvent = (state: RootState) => state.event.current;
export const selectCurrentComments = (state: RootState) => state.event.comments;
export const selectEvents = (state: RootState) => state.event.list;
export const selectChannels = (state: RootState) => state.event.channels;

export default eventSlice.reducer;
