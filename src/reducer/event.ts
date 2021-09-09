import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  getEvents,
  getComments,
  getParticipants,
  postIsGoing,
  postIsLike,
  postComment,
} from '../api/event';
import { IEventState } from '../interfaces/state';
import { IEventData } from '../interfaces/data';

const initialState: IEventState = {
  current: null,
  comments: null,
  participants: null,
  userGoing: null,
  userLikes: null,
};

export const loadEvent = createAsyncThunk('event/getEvent', async (id: string) => {
  return await getEvents({ id });
});

export const loadComments = createAsyncThunk('event/getComment', async (eventId: string) => {
  return await getComments({ eventId });
});

export const loadParticipants = createAsyncThunk(
  'event/getParticipants',
  async (eventId: string) => {
    return await getParticipants({ eventId });
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
  },
  extraReducers: (builder) => {
    builder.addCase(loadEvent.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.current = data[0];
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(loadParticipants.fulfilled, (state, action) => {
      state.participants = action.payload;
    });

    builder.addCase(setIsGoing.fulfilled, (state, action) => {
      const { event: newEvent } = action.payload;
      // state.events =
      //   state.events?.map((event) => {
      //     if (event.id === newEvent.id) return newEvent;
      //     else return event;
      //   }) || null;

      if (!newEvent.is_going) {
        state.userGoing = state.userGoing?.filter((event) => event.id !== newEvent.id) || null;
      }

      if (newEvent.id === state.current?.id) {
        state.current = newEvent;
      }
    });

    builder.addCase(setIsLike.fulfilled, (state, action) => {
      const { event: newEvent } = action.payload;
      // state.events =
      //   state.events?.map((event) => {
      //     if (event.id === newEvent.id) return newEvent;
      //     else return event;
      //   }) || null;

      if (!newEvent.is_like) {
        state.userLikes = state.userLikes?.filter((event) => event.id !== newEvent.id) || null;
      }

      if (newEvent.id === state.current?.id) {
        state.current = newEvent;
      }
    });

    builder.addCase(loadUserLikes.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.userLikes = data;
    });

    builder.addCase(loadUserGoing.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.userGoing = data;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      const { comments } = action.payload;
      state.comments = comments;
    });
  },
});

export const { setCurrentEvent } = eventSlice.actions;

export const selectCurrentEvent = (state: RootState) => state.event.current;
export const selectCurrentComments = (state: RootState) => state.event.comments;
export const selectParticipants = (state: RootState) => state.event.participants;
export const selectUserLikes = (state: RootState) => state.event.userLikes;
export const selectUserGoing = (state: RootState) => state.event.userGoing;

export default eventSlice.reducer;
