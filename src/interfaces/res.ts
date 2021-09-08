import { IEventData, IUserData } from './data';

export interface IResPostLogin {
  user: IUserData | null;
  token: string | null;
  error: string | null;
}

export interface IResPostIsGoing {
  event: IEventData;
}

export interface IResPostIsLike {
  event: IEventData;
}
