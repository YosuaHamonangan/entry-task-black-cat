import { ICommentData, IEventData, IUserData } from './data';

// Get events
export interface IReqGetEvents {
  id?: string;
  filter?: {
    from?: string;
    to?: string;
    channels?: string[];
    likes?: string;
    going?: string;
  };
  startIdx?: number;
}

export interface IResGetEvents {
  data: IEventData[];
  total: number;
}

// Get comments
export interface IReqGetComments {
  eventId?: string;
  userId?: string;
  startIdx?: number;
}

// Get Participants
export interface IReqGetParticipants {
  eventId: string;
}

// Post is going
export interface IReqPostIsGoing {
  eventId: string;
  going: boolean;
}

export interface IResPostIsGoing {
  event: IEventData;
}

// Post is like
export interface IReqPostIsLike {
  eventId: string;
  like: boolean;
}

export interface IResPostIsLike {
  event: IEventData;
}

// Post login
export interface IReqPostLogin {
  email?: string;
  password?: string;
}

export interface IResPostLogin {
  user: IUserData | null;
  token: string | null;
  error: string | null;
}

// Post comment
export interface IReqPostComment {
  eventId: string;
  userId: string;
  targetId: string | null;
  comment: string;
  time: string;
  startIdx?: number;
}

export interface IResPostComment {
  comments: ICommentData[];
}
