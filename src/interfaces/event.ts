export interface IEventData {
  id: string;
  username: string;
  channel: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  isGoing?: boolean;
  isLiked?: boolean;
  going?: number;
  likes?: number;
}
