export interface IEventData {
  id: string;
  username: string;
  channel: string;
  title: string;
  start: string;
  end: string;
  description: string;
  going?: number;
  is_going?: boolean;
  likes?: number;
  is_liked?: boolean;
}
