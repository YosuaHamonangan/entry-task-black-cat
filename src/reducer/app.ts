import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { EVENT_TABS } from '../enum/tabs';
import { IAppState } from '../interfaces/state';

const initialState: IAppState = {
  showSidemenu: false,
  selectedEventTab: EVENT_TABS.DETAIL,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidemenu: (state) => {
      state.showSidemenu = !state.showSidemenu;
    },
    hideSidemenu: (state) => {
      state.showSidemenu = false;
    },
    setSelectedEventTab: (state, action: PayloadAction<EVENT_TABS>) => {
      state.selectedEventTab = action.payload;
    },
  },
});

export const { toggleSidemenu, hideSidemenu, setSelectedEventTab } = appSlice.actions;

export const selectShowSidemenu = (state: RootState) => state.app.showSidemenu;
export const selectSelectedEventTab = (state: RootState) => state.app.selectedEventTab;

export default appSlice.reducer;
