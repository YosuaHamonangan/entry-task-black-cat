export interface IReqGetEvents {
  id?: string;
  filter?: {
    from?: string;
    to?: string;
    channels?: string[];
  };
}

export interface IReqGetComments {
  eventId: string;
}

export interface IReqGetParticipants {
  eventId: string;
}

export interface IReqLogin {
  email: string;
  password: string;
}
