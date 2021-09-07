export interface IReqGetEvents {
  id?: string;
  filter?: {
    from?: string;
    to?: string;
    channels?: string[];
    likes?: string;
    going?: string;
  };
}

export interface IReqGetComments {
  eventId: string;
}

export interface IReqGetParticipants {
  eventId: string;
}

export interface IReqLogin {
  email?: string;
  password?: string;
}
