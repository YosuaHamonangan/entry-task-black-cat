import { IReqLogin } from '../interfaces/req';
import { IUserData } from '../interfaces/res';
import { dummyUsers } from './dummyDb';

export async function postLogin(req: IReqLogin): Promise<IUserData | null> {
  const user = dummyUsers.find((user) => user.email === req.email);
  if (!user || user.password !== req.password) {
    return null;
  }

  return user;
}
