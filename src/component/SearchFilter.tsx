import React, { useEffect, useState } from 'react';
import { DateFilter } from '../enum/eventFilter';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectFilter, setDateFilter, setChannelFilter } from '../reducer/filter';
import { hideSidemenu } from '../reducer/app';
import styles from './SearchFilter.module.css';
import { selectChannels, loadChannels } from '../reducer/event';

export default function SearchFilter() {
  const dispatch = useAppDispatch();

  const currentFilter = useAppSelector(selectFilter);
  const [selectedDate, setSelectedDate] = useState(currentFilter.date);

  const channels = useAppSelector(selectChannels);
  const [selectedChannels, setSelectedChannels] = useState(currentFilter.channels);

  const disableSubmit = selectedDate === null || selectedChannels === null;

  function onClickDate(value: DateFilter | null) {
    setSelectedDate(value);
  }

  function onClickChannel(channel: string, selected: boolean) {
    const newChannel = Array.isArray(selectedChannels) ? [...selectedChannels] : [];
    const idx = newChannel.findIndex((ch) => ch === channel);

    if (selected) {
      if (idx !== -1) return;
      newChannel.push(channel);
    } else {
      if (idx === -1) return;
      newChannel.splice(idx, 1);
      if (!newChannel.length) {
        setSelectedChannels('all');
        return;
      }
    }
    setSelectedChannels(newChannel);
  }

  function selectAllChannel() {
    setSelectedChannels('all');
  }

  function onSubmit() {
    dispatch(setDateFilter({ date: selectedDate }));
    dispatch(setChannelFilter({ channel: selectedChannels }));
    dispatch(hideSidemenu());
  }

  useEffect(() => {
    dispatch(loadChannels());
  }, [dispatch]);

  useEffect(() => {
    setSelectedDate(currentFilter.date);
    setSelectedChannels(currentFilter.channels);
  }, [currentFilter]);

  return (
    <div className={`${styles.container} ${globalStyles.primaryDark}`}>
      <div className={styles.filter}>
        <div className={styles.title}>DATE</div>
        <div className={styles.dateFilter}>
          <button
            className={selectedDate === DateFilter.anytime ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.anytime)}
          >
            ANYTIME
          </button>
          <button
            className={selectedDate === DateFilter.today ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.today)}
          >
            TODAY
          </button>
          <button
            className={selectedDate === DateFilter.tomorrow ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.tomorrow)}
          >
            TOMORROW
          </button>
          <button
            className={selectedDate === DateFilter.thisWeek ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.thisWeek)}
          >
            THIS WEEK
          </button>
          <button
            className={selectedDate === DateFilter.thisMonth ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.thisMonth)}
          >
            THIS MONTH
          </button>
          <button
            className={selectedDate === DateFilter.later ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.later)}
          >
            LATER
          </button>
        </div>
        <div className={styles.title}>CHANNEL</div>
        <div className={styles.channelFilter}>
          <button
            className={selectedChannels === 'all' ? styles.selected : ''}
            onClick={() => selectAllChannel()}
          >
            All
          </button>
          {channels.map((channel, i) => {
            const selected = !!selectedChannels?.includes(channel);
            return (
              <button
                key={i}
                className={selected ? styles.selected : ''}
                onClick={() => onClickChannel(channel, !selected)}
              >
                {channel}
              </button>
            );
          })}
        </div>
      </div>
      <button onClick={onSubmit} className={styles.searchBtn} disabled={disableSubmit}>
        <div className={`${styles.logo} ${iconStyles.search}`} />
        <div>SEARCH</div>
      </button>
    </div>
  );
}
