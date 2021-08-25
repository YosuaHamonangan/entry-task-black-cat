export interface IReqGetEvents {
  filter?: {
    from?: string;
    to?: string;
    channels?: string[];
  };
}
