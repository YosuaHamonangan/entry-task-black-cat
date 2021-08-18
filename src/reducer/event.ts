import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getEvents } from '../api/event';
import { IEventData } from '../interfaces/event';

export interface IEventState {
  list: IEventData[];
}

const initialState: IEventState = {
  list: [],
};

export const loadEvents = createAsyncThunk('event/getEvents', getEvents);

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
    builder.addCase(loadEvents.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setIsLiked, setIsGoing } = eventSlice.actions;

export const selectEvent = (state: RootState) => state.event.list;

export default eventSlice.reducer;
