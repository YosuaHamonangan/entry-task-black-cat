import { DateFilter } from '../enum/eventFilter';
import { IEventData } from './res';

export interface IFilterState {
  date: DateFilter | null;
  from?: string | null;
  to?: string | null;
  channels: 'all' | string[] | null;
  isValid: boolean;
}

export interface IEventState {
  list: IEventData[];
  channels: string[];
}
