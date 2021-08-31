import { DateFilter } from '../enum/eventFilter';
import { IEventData, ICommentData, IChannelData } from './res';

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
}
