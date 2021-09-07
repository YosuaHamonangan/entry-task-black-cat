import {
  IChannelData,
  ICommentData,
  IEventData,
  IParticipantsData,
  IUserData,
} from '../interfaces/res';
import { IReqGetEvents, IReqGetComments, IReqGetParticipants } from '../interfaces/req';
import {
  dummyEvents,
  dummyCommentData,
  dummyChannels,
  dummyGoingData,
  dummyLikeData,
} from './dummyDb';
import Cookies from 'js-cookie';

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

      if (filter.likes) {
        shown =
          shown &&
          !!dummyLikeData.find(
            ({ user, event: ev }) => user.id === filter.likes && event.id === ev.id,
          );
      }

      if (filter.going) {
        shown =
          shown &&
          !!dummyGoingData.find(
            ({ user, event: ev }) => user.id === filter.going && event.id === ev.id,
          );
      }

      return shown;
    });
  }

  return data.map<IEventData>((ev) => {
    // Check user cookie
    let user: IUserData | null;
    try {
      user = JSON.parse(Cookies.get('user')!);
    } catch (e) {
      user = null;
    }

    const goingData = dummyGoingData.filter(({ event }) => event.id === ev.id);
    const likeData = dummyLikeData.filter(({ event }) => event.id === ev.id);

    const userId = user?.id;
    return {
      ...JSON.parse(JSON.stringify(ev)),
      is_going: userId ? !!goingData.find(({ user }) => user.id === userId) : false,
      going: goingData.length,
      is_liked: userId ? !!likeData.find(({ user }) => user.id === userId) : false,
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
    eventId: req.eventId,
    going: dummyGoingData
      .filter(({ event }) => event.id === req.eventId)
      .map(({ user }) => JSON.parse(JSON.stringify(user))),
    likes: dummyLikeData
      .filter(({ event }) => event.id === req.eventId)
      .map(({ user }) => JSON.parse(JSON.stringify(user))),
  };
}
