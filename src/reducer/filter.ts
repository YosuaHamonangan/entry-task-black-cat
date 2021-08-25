import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { DateFilter } from '../enum/eventFilter';
import { IFilterState } from '../interfaces/state';
import { validateFilter } from '../util/eventFilter';

const initialState: IFilterState = {
  date: null,
  channels: null,
  isValid: false,
  from: null,
  to: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<{ date: DateFilter | null }>) => {
      const { date } = action.payload;
      state.date = date;
      state.isValid = validateFilter(state);
    },
    setChannelFilter: (state, action: PayloadAction<{ channels: 'all' | string[] | null }>) => {
      const { channels } = action.payload;
      state.channels = channels;
      state.isValid = validateFilter(state);
    },
    setFilter: (state, action: PayloadAction<IFilterState>) => {
      Object.assign(state, action.payload);
      state.isValid = validateFilter(state);
    },
    clearFilter: (state) => {
      state.date = null;
      state.channels = null;
      state.isValid = false;
    },
  },
});

export const { setDateFilter, setChannelFilter, setFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
