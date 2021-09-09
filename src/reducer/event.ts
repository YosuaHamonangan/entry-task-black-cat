import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  getEvents,
  getChannels,
  getComments,
  getParticipants,
  postIsGoing,
  postIsLike,
  postComment,
} from '../api/event';
import { IReqGetEvents } from '../interfaces/api';
import { IEventState, IFilterState } from '../interfaces/state';
import { getFilterDateRange } from '../util/eventFilter';
import { IEventData } from '../interfaces/data';

const initialState: IEventState = {
  events: [],
  isLoadingEvents: false,
  channels: null,
  current: null,
  comments: null,
  participants: null,
  userGoing: null,
  userLikes: null,
  pastComments: [],
  isLoadingPastComments: false,
};

export const loadEvent = createAsyncThunk('event/getEvent', async (id: string) => {
  return await getEvents({ id });
});

export const loadComments = createAsyncThunk('event/getComment', async (eventId: string) => {
  return await getComments({ eventId });
});

export const loadPastComments = createAsyncThunk(
  'event/loadPastComments',
  async (req: { userId: string; startIdx: number }) => {
    return await getComments(req);
  },
);

export const loadParticipants = createAsyncThunk(
  'event/getParticipants',
  async (eventId: string) => {
    return await getParticipants({ eventId });
  },
);

export const loadEvents = createAsyncThunk(
  'event/getEvents',
  async (arg: { filter?: IFilterState; startIdx: number }) => {
    const { filter, startIdx } = arg;
    const req: IReqGetEvents = { startIdx };

    if (filter?.isValid) {
      const range = getFilterDateRange(filter);
      req.filter = {
        from: range?.from.toString(),
        to: range?.to.toString(),
        channels: filter.channels !== 'all' ? filter.channels!.map(({ id }) => id) : undefined,
      };
    }
    return await getEvents(req);
  },
);

export const createComment = createAsyncThunk(
  'event/createComment',
  async (data: { eventId: string; userId: string; comment: string; targetId: string | null }) => {
    const { eventId, userId, comment, targetId } = data;
    return await postComment({
      eventId,
      userId,
      targetId,
      comment,
      time: new Date().toString(),
    });
  },
);

export const loadChannels = createAsyncThunk('event/getChannels', getChannels);
export const setIsGoing = createAsyncThunk('event/setIsGoing', postIsGoing);
export const setIsLike = createAsyncThunk('event/setIsLike', postIsLike);

export const loadUserLikes = createAsyncThunk('user/loadUserLikes', async (userId: string) => {
  return await getEvents({
    filter: { likes: userId },
  });
});

export const loadUserGoing = createAsyncThunk('user/loadUserGoing', async (userId: string) => {
  return await getEvents({
    filter: { going: userId },
  });
});

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<IEventData>) => {
      state.current = action.payload;
    },
    resetEvents: (state) => {
      state.events = [];
    },
    resetPastComments: (state) => {
      state.pastComments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEvent.fulfilled, (state, action) => {
      state.current = action.payload[0];
    });

    builder.addCase(loadEvents.pending, (state) => {
      state.isLoadingEvents = true;
    });

    builder.addCase(loadEvents.rejected, (state) => {
      state.isLoadingEvents = false;
    });

    builder.addCase(loadEvents.fulfilled, (state, action) => {
      state.events = state.events.concat(action.payload);
      state.isLoadingEvents = false;
    });

    builder.addCase(loadChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(loadPastComments.pending, (state) => {
      state.isLoadingPastComments = true;
    });

    builder.addCase(loadPastComments.rejected, (state) => {
      state.isLoadingPastComments = false;
    });

    builder.addCase(loadPastComments.fulfilled, (state, action) => {
      state.pastComments = state.pastComments.concat(action.payload);
      state.isLoadingPastComments = false;
    });

    builder.addCase(loadParticipants.fulfilled, (state, action) => {
      state.participants = action.payload;
    });

    builder.addCase(setIsGoing.fulfilled, (state, action) => {
      const { event: newEvent } = action.payload;
      state.events =
        state.events?.map((event) => {
          if (event.id === newEvent.id) return newEvent;
          else return event;
        }) || null;

      if (!newEvent.is_going) {
        state.userGoing = state.userGoing?.filter((event) => event.id !== newEvent.id) || null;
      }

      if (newEvent.id === state.current?.id) {
        state.current = newEvent;
      }
    });

    builder.addCase(setIsLike.fulfilled, (state, action) => {
      const { event: newEvent } = action.payload;
      state.events =
        state.events?.map((event) => {
          if (event.id === newEvent.id) return newEvent;
          else return event;
        }) || null;

      if (!newEvent.is_like) {
        state.userLikes = state.userLikes?.filter((event) => event.id !== newEvent.id) || null;
      }

      if (newEvent.id === state.current?.id) {
        state.current = newEvent;
      }
    });

    builder.addCase(loadUserLikes.fulfilled, (state, action) => {
      const events = action.payload;
      state.userLikes = events;
    });

    builder.addCase(loadUserGoing.fulfilled, (state, action) => {
      const events = action.payload;
      state.userGoing = events;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      const { comments } = action.payload;
      state.comments = comments;
    });
  },
});

export const { setCurrentEvent, resetEvents, resetPastComments } = eventSlice.actions;

export const selectCurrentEvent = (state: RootState) => state.event.current;
export const selectCurrentComments = (state: RootState) => state.event.comments;
export const selectPastComments = (state: RootState) => state.event.pastComments;
export const selectIsLoadingPastComments = (state: RootState) => state.event.isLoadingPastComments;
export const selectEvents = (state: RootState) => state.event.events;
export const selectIsLoadingEvents = (state: RootState) => state.event.isLoadingEvents;
export const selectChannels = (state: RootState) => state.event.channels;
export const selectParticipants = (state: RootState) => state.event.participants;
export const selectUserLikes = (state: RootState) => state.event.userLikes;
export const selectUserGoing = (state: RootState) => state.event.userGoing;

export default eventSlice.reducer;
