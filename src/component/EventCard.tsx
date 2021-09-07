import React from 'react';
import { useHistory } from 'react-router-dom';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { IEventData } from '../interfaces/res';
import styles from './EventCard.module.css';
import { useAppDispatch } from '../app/hooks';
import { setIsGoing, setIsLike, setCurrentEvent } from '../reducer/event';
import { getDateTimeString } from '../util/date';

interface Iprops {
  data: IEventData;
}

export default function EventCard({ data }: Iprops) {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const start = getDateTimeString(data.start);
  const end = getDateTimeString(data.end);

  function onClick() {
    dispatch(setCurrentEvent(data));
    history.push(`/event/${data.id}`);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img className={styles.userPicture} src={data.user.picture} alt="profile" />

        <div>{data.user.username}</div>
        <div className={styles.channel}>{data.channel.name}</div>
      </div>
      <button onClick={onClick}>
        <h2 className={styles.title}>{data.title}</h2>
      </button>
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
              dispatch(setIsGoing({ eventId: data.id, going: false }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.check} ${globalStyles.complementDark1}`} />
            <span className={globalStyles.textPrimaryDark}>I am going</span>
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsGoing({ eventId: data.id, going: true }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.checkOutline} ${globalStyles.primary}`} />
            <span className={globalStyles.textPrimary}>{data.going || 0} Going</span>
          </button>
        )}
        {data.is_like ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsLike({ eventId: data.id, like: false }));
            }}
          >
            <div className={`${styles.icon} ${iconStyles.like} ${globalStyles.redLight}`} />
            <span className={globalStyles.textPrimaryDark}>I like it</span>
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsLike({ eventId: data.id, like: true }));
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
