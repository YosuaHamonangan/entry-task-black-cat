import React from 'react';
import { IEventData } from '../interfaces/data';
import EventCard from './EventCard';
import styles from './EventList.module.css';
import NoActivity from './NoActivity';

interface IProps {
  events: IEventData[] | null;
}

export default function EventList({ events }: IProps) {
  return (
    <div className={styles.container}>
      {events?.length ? events.map((data, i) => <EventCard key={i} data={data} />) : <NoActivity />}
    </div>
  );
}
