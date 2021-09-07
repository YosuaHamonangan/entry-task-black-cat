import { errorKey } from '../enum/error';
import { DateFilter } from '../enum/eventFilter';
import { IEventData, ICommentData, IChannelData, IParticipantsData, IUserData } from './res';

export interface IFilterState {
  date: DateFilter | null;
  from?: string | null;
  to?: string | null;
  channels: 'all' | IChannelData[] | null;
  isValid: boolean;
}

export interface IEventState {
  list: IEventData[] | null;
  channels: IChannelData[] | null;
  current: IEventData | null;
  comments: ICommentData[] | null;
  participants: IParticipantsData | null;
}

export interface IUserState {
  current: IUserData | null;
  likes: IEventData[] | null;
  going: IEventData[] | null;
  error: {
    key: errorKey;
    message: string;
  } | null;
}

export interface IAppState {
  showSidemenu: boolean;
}
