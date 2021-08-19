import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import EventCard from '../component/EventCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvent } from '../reducer/event';
import SearchFilter from '../component/SearchFilter';

export default function Home() {
  const events = useAppSelector(selectEvent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <PageTemplate sidemenu={<SearchFilter />}>
      {events.map((data, i) => (
        <EventCard key={i} data={data} />
      ))}
    </PageTemplate>
  );
}
