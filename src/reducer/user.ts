import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { postLogin, postTokenLogin } from '../api/user';
import { getEvents } from '../api/event';
import { IUserState } from '../interfaces/state';
import { IReqLogin } from '../interfaces/req';
import { errorKey } from '../enum/error';
import Cookies from 'js-cookie';
import { IUserData } from '../interfaces/res';

const initialState: IUserState = {
  isAuthenticated: null,
  current: null,
  likes: null,
  going: null,
  error: null,
};

export const tryRelogin = createAsyncThunk('user/tryRelogin', async () => {
  const existingToken = Cookies.get('token');
  if (!existingToken) return { user: null, token: null, error: null };
  const { user, token } = await postTokenLogin();
  return { user, token, error: null };
});

export const login = createAsyncThunk('user/login', async (data: IReqLogin) => {
  const { user, token, error } = await postLogin(data);
  return {
    user,
    token,
    error: error ? { key: errorKey.LOGIN_FORM, message: error } : null,
  };
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
    function setUser(
      state: IUserState,
      action: PayloadAction<{
        user: IUserData | null;
        token: string | null;
        error: { key: errorKey; message: string } | null;
      }>,
    ) {
      const { user, token, error } = action.payload;
      state.current = user;
      state.isAuthenticated = !!user;
      state.likes = null;
      state.going = null;
      state.error = error;

      if (user) Cookies.set('user_id', user.id);
      if (token) Cookies.set('token', token);
    }

    builder.addCase(login.fulfilled, setUser);
    builder.addCase(tryRelogin.fulfilled, setUser);

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

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.user.current;
export const selectLoginError = (state: RootState) => state.user.error;
export const selectUserLikes = (state: RootState) => state.user.likes;
export const selectUserGoing = (state: RootState) => state.user.going;

export default userSlice.reducer;
