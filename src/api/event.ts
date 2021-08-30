import { IEventData, IParticipantsData } from '../interfaces/res';
import { IReqGetEvents } from '../interfaces/req';
import { dummyEvents } from './dummyDb';

export async function getEvents(req: IReqGetEvents): Promise<IEventData[]> {
  let data = dummyEvents;
  const { filter } = req;

  if (req.id) {
    data = data.filter((event) => event.id === req.id);
  }

  if (filter) {
    const minDate = filter.from ? new Date(filter.from) : null;
    const maxDate = filter.to ? new Date(filter.to) : null;

    data = data.filter((event) => {
      let shown = true;

      if (minDate && maxDate) {
        const startDate = new Date(event.start);
        shown = shown && startDate >= minDate && startDate <= maxDate;
      }

      if (filter.channels) {
        shown = shown && filter.channels.includes(event.channel.id);
      }

      return shown;
    });
  }

  return JSON.parse(JSON.stringify(data));
}

export async function getChannels(): Promise<string[]> {
  const map = new Map<string, boolean>();
  dummyEvents.forEach(({ channel }) => map.set(channel.id, true));
  return Array.from(map.keys());
}

// eslint-disable-next-line no-unused-vars
export async function getParticipants(eventId: string): Promise<IParticipantsData> {
  const res: IParticipantsData = { likes: [], going: [] };
  return res;
}
