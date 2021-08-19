import { IEventData } from '../interfaces/event';
import { IReqGetEvents } from '../interfaces/req';

const dummyData: IEventData[] = [
  {
    id: '1',
    username: 'username',
    channel: 'channel',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    isGoing: true,
    isLiked: true,
  },
  {
    id: '2',
    username: 'username 2',
    channel: 'Channel name longer',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    going: 6,
    likes: 10,
  },
  {
    id: '3',
    username: 'username',
    channel: 'channel',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    isGoing: true,
    isLiked: true,
  },
];

export async function getEvents(req: IReqGetEvents): Promise<IEventData[]> {
  let data = dummyData;
  const { filter } = req;

  if (filter) {
    data = data.filter((event) => {
      let shown = true;
      if (filter.channels) {
        shown = shown && filter.channels.includes(event.channel);
      }

      return shown;
    });
  }

  return JSON.parse(JSON.stringify(data));
}

export async function getChannels(): Promise<string[]> {
  const map = new Map<string, boolean>();
  dummyData.forEach(({ channel }) => map.set(channel, true));
  return Array.from(map.keys());
}
