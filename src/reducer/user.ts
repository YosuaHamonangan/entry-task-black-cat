import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { postLogin } from '../api/user';
import { getEvents } from '../api/event';
import { IUserState } from '../interfaces/state';
import { IReqLogin } from '../interfaces/req';
import { errorKey } from '../enum/error';
import Cookies from 'js-cookie';

const cookieUser = Cookies.get('user');
const initialState: IUserState = {
  current: cookieUser ? JSON.parse(cookieUser) : null,
  likes: null,
  going: null,
  error: null,
};

export const login = createAsyncThunk('user/login', async (data: IReqLogin) => {
  return await postLogin(data);
});

export const loadUserLikes = createAsyncThunk('user/loadUserLikes', async (userId: string) => {
  return await getEvents({
    filter: { likes: userId },
  });
});

export const loadUserGoing = createAsyncThunk('user/loadUserGoing', async (userId: string) => {
  return await getEvents({
    filter: { going: userId },
  });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload;
      state.current = user;
      state.likes = null;
      state.going = null;

      state.error = user
        ? null
        : { key: errorKey.LOGIN_FORM, message: 'Invalid username or password' };

      if (user) {
        Cookies.set('user', JSON.stringify(user));
      } else {
        Cookies.remove('user');
      }
    });

    builder.addCase(loadUserLikes.fulfilled, (state, action) => {
      const events = action.payload;
      state.likes = events;
    });

    builder.addCase(loadUserGoing.fulfilled, (state, action) => {
      const events = action.payload;
      state.going = events;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.user.current;
export const selectLoginError = (state: RootState) => state.user.error;
export const selectUserLikes = (state: RootState) => state.user.likes;
export const selectUserGoing = (state: RootState) => state.user.going;

export default userSlice.reducer;
