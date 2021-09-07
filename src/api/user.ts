import Cookies from 'js-cookie';
import { IReqLogin } from '../interfaces/req';
import { ILoginData } from '../interfaces/res';
import { dummyUsers } from './dummyDb';

export async function postLogin(req: IReqLogin): Promise<ILoginData> {
  const user = dummyUsers.find((user) => user.email === req.email);
  if (!user || user.password !== req.password) {
    return {
      error: 'Invalid username or password',
      user: null,
      token: null,
    };
  }

  Cookies.set('user_id', user.id);
  Cookies.set('token', 'token');
  return {
    user,
    token: 'token',
    error: null,
  };
}

export async function postTokenLogin(): Promise<ILoginData> {
  const userId = Cookies.get('user_id');
  const token = Cookies.get('token');

  if (token !== 'token') {
    return {
      error: 'Invalid token',
      user: null,
      token: null,
    };
  }
  const user = dummyUsers.find((user) => user.id === userId) || null;
  if (user) {
    Cookies.set('user_id', user.id);
    Cookies.set('token', 'token');
  }
  return {
    user,
    token: user ? 'token' : null,
    error: null,
  };
}

export async function postLogout(): Promise<boolean> {
  Cookies.remove('user_id');
  Cookies.remove('token');
  return true;
}
