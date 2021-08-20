import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { IEventData } from '../interfaces/event';
import styles from './EventCard.module.css';
import { useAppDispatch } from '../app/hooks';
import { setIsGoing, setIsLiked } from '../reducer/event';

interface Iprops {
  data: IEventData;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function EventCard({ data }: Iprops) {
  const dispatch = useAppDispatch();
  const start = new Date(data.start).toLocaleDateString('en-GB', dateOptions).replace(',', '');
  const end = new Date(data.end).toLocaleDateString('en-GB', dateOptions).replace(',', '');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.userPicture} ${iconStyles.user} ${globalStyles.black}`} />
        <div>{data.username}</div>
        <div className={styles.channel}>{data.channel}</div>
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.date}>
        <div className={`${styles.dateIcon} ${iconStyles.time} ${globalStyles.primary}`} />
        <span className={globalStyles.textPrimary}>
          {start} - {end}
        </span>
      </div>
      <div className={styles.description}>{data.description}</div>
      <div className={styles.footer}>
        {data.is_going ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsGoing({ id: data.id, val: false }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.check} ${globalStyles.complementDark1}`} />
            <span className={globalStyles.textPrimaryDark}>I am going</span>
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsGoing({ id: data.id, val: true }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.checkOutline} ${globalStyles.primary}`} />
            <span className={globalStyles.textPrimary}>{data.going || 0} Going</span>
          </button>
        )}
        {data.is_liked ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsLiked({ id: data.id, val: false }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.like} ${globalStyles.redLight}`} />
            <span className={globalStyles.textPrimaryDark}>I like it</span>
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsLiked({ id: data.id, val: true }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.likeOutline} ${globalStyles.primary}`} />
            <span className={globalStyles.textPrimary}>{data.likes || 0} Likes</span>
          </button>
        )}
        <div />
      </div>
    </div>
  );
}
