import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, resetEvents, selectEvents, selectIsLoadingEvents } from '../reducer/event';
import { selectFilter, clearFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';
import { getFilterSummary } from '../util/eventFilter';
import EventList from '../component/EventList';
import InfiniteScrolling from '../component/InfiniteScrolling';
import { IEventData } from '../interfaces/data';
import { store } from '../app/store';

export default function Home() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectEvents);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(resetEvents());
  }, [dispatch, filter]);

  async function getNext() {
    const startIdx = events.length || 0;
    const isLoading = selectIsLoadingEvents(store.getState());
    if (isLoading) throw 'Multiple loading';

    const action = await dispatch(loadEvents({ filter, startIdx }));
    return action.payload as IEventData[];
  }

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
        <InfiniteScrolling next={getNext}>
          <EventList events={events} />
        </InfiniteScrolling>
      </div>
    </PageTemplate>
  );
}
