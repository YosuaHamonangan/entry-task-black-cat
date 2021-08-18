import React, { useEffect } from 'react';
import Header from '../component/Header';
import Content from '../component/Content';
import EventCard from '../component/EventCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvent } from '../reducer/event';

export default function Home() {
  const events = useAppSelector(selectEvent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Content>
        {events.map((data, i) => (
          <EventCard key={i} data={data} />
        ))}
      </Content>
    </div>
  );
}
