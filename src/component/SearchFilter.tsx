import React, { useState } from 'react';
import { DateFilter } from '../enum/eventFilter';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import styles from './SearchFilter.module.css';

export default function SearchFilter() {
  const [selectedDate, setSelectedDate] = useState<DateFilter | null>(null);

  function onSelectDate(value: DateFilter | null) {
    setSelectedDate(value);
  }

  return (
    <div className={`${styles.container} ${globalStyles.primaryDark}`}>
      <div className={styles.filter}>
        <div className={styles.title}>DATE</div>
        <div className={styles.dateFilter}>
          <button
            className={selectedDate === DateFilter.anytime ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.anytime)}
          >
            ANYTIME
          </button>
          <button
            className={selectedDate === DateFilter.today ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.today)}
          >
            TODAY
          </button>
          <button
            className={selectedDate === DateFilter.tomorrow ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.tomorrow)}
          >
            TOMORROW
          </button>
          <button
            className={selectedDate === DateFilter.thisWeek ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.thisWeek)}
          >
            THIS WEEK
          </button>
          <button
            className={selectedDate === DateFilter.thisMonth ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.thisMonth)}
          >
            THIS MONTH
          </button>
          <button
            className={selectedDate === DateFilter.later ? styles.selected : ''}
            onClick={() => onSelectDate(DateFilter.later)}
          >
            LATER
          </button>
        </div>
        <div className={styles.title}>CHANNEL</div>
        <div className={styles.channelFilter}>
          <button>All</button>
          <button>Channel 1</button>
          <button>Channel 2</button>
          <button>Channel 3</button>
          <button>Channel 4</button>
          <button>Channel 5</button>
        </div>
      </div>
      <button className={`${styles.searchBtn} ${globalStyles.disabledBackground}`}>
        <div className={`${styles.logo} ${iconStyles.search}`} />
        SEARCH
      </button>
    </div>
  );
}
