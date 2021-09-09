import React from 'react';
import PageTemplate from '../component/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEventList, resetEvents, selectEventList } from '../reducer/eventList';
import { selectFilter, clearFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';
import { getFilterSummary } from '../util/eventFilter';
import EventList from '../component/EventList';
import InfiniteScrolling from '../component/InfiniteScrolling';

export default function Home() {
  const dispatch = useAppDispatch();

  const { list: events } = useAppSelector(selectEventList);
  const filter = useAppSelector(selectFilter);

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
        <InfiniteScrolling
          loadAsyncThunk={loadEventList}
          selectState={selectEventList}
          resetAction={resetEvents()}
        >
          <EventList events={events} />
        </InfiniteScrolling>
      </div>
    </PageTemplate>
  );
}
