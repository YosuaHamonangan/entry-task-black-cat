import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface IAppState {
  showSidemenu: boolean;
}

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
