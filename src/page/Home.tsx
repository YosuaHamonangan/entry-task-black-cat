import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import EventCard from '../component/EventCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvents } from '../reducer/event';
import { selectFilter, clearFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';
import { getFilterSummary } from '../util/eventFilter';
import iconStyles from '../enum/iconStyles';

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
        {events?.length ? (
          <div className={styles.list}>
            {events.map((data, i) => (
              <EventCard key={i} data={data} />
            ))}
          </div>
        ) : (
          <div className={styles.noActivity}>
            <div>
              <div className={`${styles.noActivityIcon} ${iconStyles.noActivity}`} />
              No activity found
            </div>
          </div>
        )}
      </div>
    </PageTemplate>
  );
}
