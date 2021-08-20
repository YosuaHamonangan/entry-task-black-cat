import React, { useEffect } from 'react';
import PageTemplate from '../component/PageTemplate';
import EventCard from '../component/EventCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadEvents, selectEvents } from '../reducer/event';
import { selectFilter, clearFilter } from '../reducer/filter';
import SearchFilter from '../component/SearchFilter';
import styles from './Home.module.css';
import { getFilterDateRange } from '../util/dateFilter';
import iconStyles from '../enum/iconStyles';

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
};

export default function Home() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectEvents);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(loadEvents(filter));
  }, [dispatch, filter]);

  let minDate = '';
  let maxDate = '';

  if (filter?.date) {
    const range = getFilterDateRange(filter.date);
    if (range) {
      const { max, min } = range;
      minDate = min.toLocaleDateString('en-GB', dateOptions).replace(',', '');

      max.setDate(max.getDate() - 1);
      maxDate = max.toLocaleDateString('en-GB', dateOptions).replace(',', '');
    }
  }

  return (
    <PageTemplate sidemenu={<SearchFilter />}>
      <div className={styles.container}>
        {filter.isValid && (
          <div className={styles.searchHeader}>
            <div className={styles.resultNum}>{events.length} Results</div>
            <button className={styles.clearBtn} onClick={() => dispatch(clearFilter())}>
              CLEAR SEARCH
            </button>
            <div className={styles.searchDesc}>
              Searched for{' '}
              {filter.channels! === 'all' ? 'all channel' : filter.channels!.join(', ')} Activities{' '}
              {minDate === maxDate ? `on ${minDate}` : `from ${minDate} to ${maxDate}`}
            </div>
          </div>
        )}
        {events.length ? (
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
