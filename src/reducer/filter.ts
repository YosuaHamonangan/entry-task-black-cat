import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { DateFilter } from '../enum/eventFilter';

export interface IFilterState {
  date: DateFilter | null;
  channels: 'all' | string[] | null;
  isValid: boolean;
}

const initialState: IFilterState = {
  date: null,
  channels: null,
  isValid: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<{ date: DateFilter | null }>) => {
      const { date } = action.payload;
      state.date = date;
      state.isValid = state.date !== null && state.channels !== null;
    },
    setChannelFilter: (state, action: PayloadAction<{ channel: 'all' | string[] | null }>) => {
      const { channel } = action.payload;
      state.channels = channel;
      state.isValid = state.date !== null && state.channels !== null;
    },
    clearFilter: (state) => {
      state.date = null;
      state.channels = null;
      state.isValid = false;
    },
  },
});

export const { setDateFilter, setChannelFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
