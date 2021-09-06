import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { postLogin } from '../api/user';
import { IUserState } from '../interfaces/state';
import { IReqLogin } from '../interfaces/req';
import { errorKey } from '../enum/error';
import Cookies from 'js-cookie';

const cookieUser = Cookies.get('user');
const initialState: IUserState = {
  current: cookieUser ? JSON.parse(cookieUser) : null,
  error: null,
};

export const login = createAsyncThunk('login', async (data: IReqLogin) => {
  return await postLogin(data);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload;
      state.current = user;
      state.error = user
        ? null
        : { key: errorKey.LOGIN_FORM, message: 'Invalid username or password' };

      if (user) {
        Cookies.set('user', JSON.stringify(user));
      } else {
        Cookies.remove('user');
      }
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.user.current;
export const selectLoginError = (state: RootState) => state.user.error;

export default userSlice.reducer;
