import {
  IChannelData,
  ICommentData,
  IEventData,
  IGoingData,
  ILikeData,
  IParticipantsData,
  IUserData,
} from '../interfaces/data';
import {
  IReqGetEvents,
  IReqGetComments,
  IReqGetParticipants,
  IReqPostIsGoing,
  IReqPostIsLike,
  IResPostIsGoing,
  IResPostIsLike,
  IReqPostComment,
  IResPostComment,
  IResGetEvents,
} from '../interfaces/api';
import {
  dummyEvents,
  dummyCommentData,
  dummyChannels,
  dummyGoingData,
  dummyLikeData,
  dummyUsers,
} from './dummyDb';
import Cookies from 'js-cookie';

const MAX_GET_COUNT = 10;

export async function getEvents(req: IReqGetEvents): Promise<IResGetEvents> {
  dummyEvents.sort((ev1, ev2) => {
    const d1 = new Date(ev1.start);
    const d2 = new Date(ev2.start);
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
    return 0;
  });

  let data = dummyEvents;
  const { filter, startIdx = 0 } = req;

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

  const total = data.length;
  data = data.slice(startIdx, startIdx + MAX_GET_COUNT);
  data = data.map<IEventData>((ev) => {
    const userId = Cookies.get('user_id') || null;

    const goingData = dummyGoingData.filter(({ event }) => event.id === ev.id);
    const likeData = dummyLikeData.filter(({ event }) => event.id === ev.id);

    return {
      ...JSON.parse(JSON.stringify(ev)),
      is_going: userId ? !!goingData.find(({ user }) => user.id === userId) : false,
      going: goingData.length,
      is_like: userId ? !!likeData.find(({ user }) => user.id === userId) : false,
      likes: likeData.length,
    };
  });

  return { data, total };
}

export async function getComments(req: IReqGetComments): Promise<ICommentData[]> {
  const { eventId, userId, startIdx = 0 } = req;

  dummyCommentData.sort((c1, c2) => {
    const d1 = new Date(c1.time);
    const d2 = new Date(c2.time);
    if (d1 > d2) return -1;
    if (d1 < d2) return 1;
    return 0;
  });

  const data: ICommentData[] = [];
  let i = 0;
  while (i < dummyCommentData.length && data.length < startIdx + MAX_GET_COUNT) {
    const comment = dummyCommentData[i];
    const { event, user } = comment;

    let shown = true;
    if (eventId) shown = shown && event.id === eventId;
    if (userId) shown = shown && user.id === userId;

    if (shown) data.push(comment);

    i++;
  }
  data.splice(0, startIdx);

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

export async function postIsGoing(req: IReqPostIsGoing): Promise<IResPostIsGoing> {
  const userId = Cookies.get('user_id');
  const { eventId, going } = req;

  const idx = dummyGoingData.findIndex(
    ({ user, event }) => user.id === userId && event.id === eventId,
  );

  if (going && idx === -1) {
    const goingData: IGoingData = {
      user: dummyUsers.find((user) => user.id === userId)!,
      event: dummyEvents.find((event) => event.id === eventId)!,
    };
    dummyGoingData.push(goingData);
  }

  if (!going && idx !== -1) {
    dummyGoingData.splice(idx, 1);
  }

  return {
    event: (await getEvents({ id: eventId })).data[0],
  };
}

export async function postIsLike(req: IReqPostIsLike): Promise<IResPostIsLike> {
  const userId = Cookies.get('user_id');
  const { eventId, like } = req;

  const idx = dummyLikeData.findIndex(
    ({ user, event }) => user.id === userId && event.id === eventId,
  );

  if (like && idx === -1) {
    const likeData: ILikeData = {
      user: dummyUsers.find((user) => user.id === userId)!,
      event: dummyEvents.find((event) => event.id === eventId)!,
    };
    dummyLikeData.push(likeData);
  }

  if (!like && idx !== -1) {
    dummyLikeData.splice(idx, 1);
  }

  return {
    event: (await getEvents({ id: eventId })).data[0],
  };
}

export async function postComment(req: IReqPostComment): Promise<IResPostComment> {
  const { eventId, userId, targetId, comment, time } = req;

  const event = dummyEvents.find((event) => event.id === eventId);
  if (!event) throw 'event not found';

  const user = dummyUsers.find((user) => user.id === userId);
  if (!user) throw 'user not found';

  let target: IUserData | null = null;
  if (targetId) {
    target = dummyUsers.find((user) => user.id === targetId)!;
    if (!target) throw 'user not found';
  }

  dummyCommentData.push({
    event,
    user,
    target,
    comment,
    time,
  });
  return {
    comments: await getComments({ eventId }),
  };
}
