import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { loadEvent, selectEvents } from '../reducer/event';
import PageTemplate from '../component/PageTemplate';

export default function Event() {
  const dispatch = useAppDispatch();

  let { id } = useParams<{ id: string }>();
  const events = useAppSelector(selectEvents);
  const event = events.find((event) => event.id === id);

  useEffect(() => {
    if (event) return;
    dispatch(loadEvent(id));
  }, [dispatch, id, event]);

  return <PageTemplate>{event?.title}</PageTemplate>;
}
