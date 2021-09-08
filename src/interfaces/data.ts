export interface IUserData {
  id: string;
  username: string;
  email: string;
  password: string;
  picture?: string;
}

export interface IChannelData {
  id: string;
  name: string;
}

export interface IEventData {
  id: string;
  user: IUserData;
  channel: IChannelData;
  title: string;
  start: string;
  end: string;
  description: string;
  published: string;
  address: string;
  location: string;
  coordinate: string;
  going?: number;
  is_going?: boolean;
  likes?: number;
  is_like?: boolean;
}

export interface ICommentData {
  event: IEventData;
  user: IUserData;
  comment: string;
  time: string;
  target: IUserData | null;
}

export interface ILikeData {
  event: IEventData;
  user: IUserData;
}

export interface IGoingData {
  event: IEventData;
  user: IUserData;
}

export interface IParticipantsData {
  eventId: string;
  going: IUserData[];
  likes: IUserData[];
}
