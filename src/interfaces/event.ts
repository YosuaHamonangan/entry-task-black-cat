export interface IEventData {
  id: string;
  username: string;
  channel: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  going?: number;
  is_going?: boolean;
  likes?: number;
  is_liked?: boolean;
}
