import { errorKey } from '../enum/error';
import { DateFilter } from '../enum/eventFilter';
import { EVENT_TABS } from '../enum/tabs';
import { IEventData, ICommentData, IChannelData, IParticipantsData, IUserData } from './data';

export interface IEventState {
  current: IEventData | null;
  comments: ICommentData[] | null;
  participants: IParticipantsData | null;
  userLikes: IEventData[] | null;
  userGoing: IEventData[] | null;
}

export interface IUserState {
  isAuthenticated: boolean | null;
  current: IUserData | null;
  error: {
    key: errorKey;
    message: string;
  } | null;
}

export interface IAppState {
  showSidemenu: boolean;
  selectedEventTab: EVENT_TABS;
}

export interface IInfiniteListState {
  list: any[];
  isLoading: boolean;
  hasMore: boolean;
}

export interface IFilterState {
  date: DateFilter | null;
  from?: string | null;
  to?: string | null;
  channels: 'all' | IChannelData[] | null;
  isValid: boolean;
}

export interface IEventListState extends IInfiniteListState {
  list: IEventData[];
  total: number;
  channelList: IChannelData[];
  filter: IFilterState;
}

export interface IPastCommentListState extends IInfiniteListState {
  list: ICommentData[];
}
