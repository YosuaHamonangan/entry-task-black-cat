import { IChannelData, ICommentData, IEventData, IParticipantsData } from '../interfaces/res';
import { IReqGetEvents, IReqGetComments } from '../interfaces/req';
import { dummyEvents, dummyCommentData, dummyChannels } from './dummyDb';

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

export async function getComments(req: IReqGetComments): Promise<ICommentData[]> {
  const data = dummyCommentData.filter(({ event }) => event.id === req.eventId);
  return data;
}

export async function getChannels(): Promise<IChannelData[]> {
  return dummyChannels;
}

// eslint-disable-next-line no-unused-vars
export async function getParticipants(eventId: string): Promise<IParticipantsData> {
  const res: IParticipantsData = { likes: [], going: [] };
  return res;
}
