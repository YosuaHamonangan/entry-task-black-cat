import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvents } from '../reducer/event';
import { selectFilter, clearFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';
import { getFilterSummary } from '../util/eventFilter';
import EventList from '../component/EventList';

export default function Home() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectEvents);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(loadEvents(filter));
  }, [dispatch, filter]);

  return (
    <PageTemplate sidemenu={<SearchFilter />}>
      <div className={styles.container}>
        {filter.isValid && events && (
          <div className={styles.searchHeader}>
            <div className={styles.resultNum}>{events.length} Results</div>
            <button className={styles.clearBtn} onClick={() => dispatch(clearFilter())}>
              CLEAR SEARCH
            </button>
            <div className={styles.searchDesc}>Searched for {getFilterSummary(filter)}</div>
          </div>
        )}
        <EventList events={events} />
      </div>
    </PageTemplate>
  );
}
