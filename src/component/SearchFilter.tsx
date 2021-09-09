import React, { useEffect, useState } from 'react';
import { DateFilter } from '../enum/eventFilter';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectFilter, setFilter } from '../reducer/filter';
import { hideSidemenu } from '../reducer/app';
import styles from './SearchFilter.module.css';
import { selectChannels, loadChannels } from '../reducer/eventList';
import { getFilterSummary, validateFilter } from '../util/eventFilter';
import { IFilterState } from '../interfaces/state';
import { IChannelData } from '../interfaces/data';

export default function SearchFilter() {
  const dispatch = useAppDispatch();

  const channels = useAppSelector(selectChannels);
  const currentFilter = useAppSelector(selectFilter);
  const [selectedFilter, setSelectedFilter] = useState<IFilterState>({
    date: null,
    channels: null,
    isValid: false,
  });

  function updateSelectedFilter(value: {
    date?: DateFilter | null;
    channels?: 'all' | IChannelData[] | null;
    from?: string | null;
    to?: string | null;
  }) {
    const nextState: IFilterState = { ...selectedFilter, ...value };
    nextState.isValid = validateFilter(nextState);
    setSelectedFilter(nextState);
  }

  function onClickDate(value: DateFilter | null) {
    updateSelectedFilter({ date: value });
  }

  function onClickChannel(channel: IChannelData, selected: boolean) {
    const selectedChannels = selectedFilter.channels;
    let newChannel: 'all' | IChannelData[] = Array.isArray(selectedChannels)
      ? [...selectedChannels]
      : [];
    const idx = newChannel.findIndex((ch) => ch === channel);

    if (selected) {
      if (idx !== -1) return;
      newChannel.push(channel);
    } else {
      if (idx === -1) return;
      newChannel.splice(idx, 1);
      if (!newChannel.length) {
        newChannel = 'all';
      }
    }

    updateSelectedFilter({ channels: newChannel });
  }

  function selectAllChannel() {
    updateSelectedFilter({ channels: 'all' });
  }

  function onSubmit() {
    dispatch(setFilter(selectedFilter));
    dispatch(hideSidemenu());
  }

  useEffect(() => {
    dispatch(loadChannels());
  }, [dispatch]);

  useEffect(() => {
    setSelectedFilter(currentFilter);
  }, [currentFilter]);

  const { date: selectedDate, channels: selectedChannels, isValid } = selectedFilter;
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
          <div className={styles.break} />
          <button
            className={selectedDate === DateFilter.later ? styles.selected : ''}
            onClick={() => onClickDate(DateFilter.later)}
          >
            LATER
          </button>
          {selectedDate === DateFilter.later && (
            <div className={styles.dateInputs}>
              <input
                type="date"
                className={styles.minDate}
                onChange={(evt) => {
                  updateSelectedFilter({ from: evt.target.value });
                }}
                value={selectedFilter.from || ''}
              />
              <input
                type="date"
                className={styles.maxDate}
                onChange={(evt) => {
                  updateSelectedFilter({ to: evt.target.value });
                }}
                value={selectedFilter.to || ''}
              />
            </div>
          )}
        </div>
        <div className={styles.title}>CHANNEL</div>
        <div className={styles.channelFilter}>
          <button
            className={selectedChannels === 'all' ? styles.selected : ''}
            onClick={() => selectAllChannel()}
          >
            All
          </button>
          {channels?.map((channel, i) => {
            const selected = selectedChannels !== 'all' && selectedChannels?.includes(channel);
            return (
              <button
                key={i}
                className={selected ? styles.selected : ''}
                onClick={() => onClickChannel(channel, !selected)}
              >
                {channel.name}
              </button>
            );
          })}
        </div>
      </div>
      <button onClick={onSubmit} className={styles.searchBtn} disabled={!isValid}>
        <div className={styles.searchLabel}>
          <div className={`${styles.logo} ${iconStyles.search}`} />
          <div>SEARCH</div>
        </div>
        {isValid && <div className={styles.summary}>{getFilterSummary(selectedFilter)}</div>}
      </button>
    </div>
  );
}
