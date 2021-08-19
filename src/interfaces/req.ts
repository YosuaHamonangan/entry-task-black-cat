import { DateFilter } from '../enum/eventFilter';

export interface IReqGetEvents {
  filter?: {
    date?: DateFilter;
    channels?: string[];
  };
}
