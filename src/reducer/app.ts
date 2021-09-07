import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IAppState } from '../interfaces/state';

const initialState: IAppState = {
  showSidemenu: false,
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
  },
});

export const { toggleSidemenu, hideSidemenu } = appSlice.actions;

export const selectShowSidemenu = (state: RootState) => state.app.showSidemenu;

export default appSlice.reducer;
