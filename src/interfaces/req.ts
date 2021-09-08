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

export interface IReqPostIsGoing {
  eventId: string;
  going: boolean;
}

export interface IReqPostIsLike {
  eventId: string;
  like: boolean;
}

export interface IReqPostLogin {
  email?: string;
  password?: string;
}

export interface IReqPostComment {}
