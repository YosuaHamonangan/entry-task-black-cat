import { IChannelData, ICommentData, IEventData, IParticipantsData } from '../interfaces/res';
import { IReqGetEvents, IReqGetComments, IReqGetParticipants } from '../interfaces/req';
import {
  dummyEvents,
  dummyCommentData,
  dummyChannels,
  dummyGoingData,
  dummyLikeData,
} from './dummyDb';

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

  return data.map<IEventData>((ev) => {
    const goingData = dummyGoingData.filter(({ event }) => event.id === ev.id);
    const likeData = dummyLikeData.filter(({ event }) => event.id === ev.id);
    return {
      ...JSON.parse(JSON.stringify(ev)),
      going: goingData.length,
      likes: likeData.length,
    };
  });
}

export async function getComments(req: IReqGetComments): Promise<ICommentData[]> {
  const data = dummyCommentData.filter(({ event }) => event.id === req.eventId);
  return JSON.parse(JSON.stringify(data));
}

export async function getChannels(): Promise<IChannelData[]> {
  return JSON.parse(JSON.stringify(dummyChannels));
}

// eslint-disable-next-line no-unused-vars
export async function getParticipants(req: IReqGetParticipants): Promise<IParticipantsData> {
  return {
    likes: dummyGoingData
      .filter(({ event }) => event.id === req.eventId)
      .map(({ user }) => JSON.parse(JSON.stringify(user))),
    going: dummyLikeData
      .filter(({ event }) => event.id === req.eventId)
      .map(({ user }) => JSON.parse(JSON.stringify(user))),
  };
}
