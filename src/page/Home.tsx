import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import EventCard from '../component/EventCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvents } from '../reducer/event';
import { selectFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';

export default function Home() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectEvents);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(loadEvents(filter));
  }, [dispatch, filter]);

  return (
    <PageTemplate sidemenu={<SearchFilter />}>
      {filter.isValid && (
        <div className={styles.searchHeader}>
          <div className={styles.resultNum}>{events.length} Results</div>
          <button className={styles.clearBtn}>CLEAR SEARCH</button>
          <div className={styles.searchDesc}>
            Searched for {filter.channels! === 'all' ? 'all channel' : filter.channels!.join(', ')}{' '}
            Activities from 20/06 to 24/06
          </div>
        </div>
      )}
      {events.map((data, i) => (
        <EventCard key={i} data={data} />
      ))}
    </PageTemplate>
  );
}
