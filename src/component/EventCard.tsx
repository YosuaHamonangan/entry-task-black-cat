import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { IEventData } from '../interfaces/event';
import styles from './EventCard.module.css';

interface Iprops {
  data: IEventData;
}

export default function EventCard({ data }: Iprops) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.userPicture} ${iconStyles.user} ${globalStyles.black}`} />
        <div>{data.username}</div>
        <div className={styles.channel}>{data.channel}</div>
      </div>
      <h3 className={styles.title}>{data.title}</h3>
      <div className={styles.date}>
        <div className={`${styles.dateIcon} ${iconStyles.time} ${globalStyles.primary}`} />
        <span className={globalStyles.textPrimary}>
          {data.start.toDateString()} - {data.end.toDateString()}
        </span>
      </div>
      <div className={globalStyles.textPrimaryNeutral}>{data.description}</div>
      <div className={styles.footer}>
        {data.isGoing ? (
          <div>
            <div className={`${styles.icon} ${iconStyles.check} ${globalStyles.complementDark1}`} />
            <span className={globalStyles.textPrimaryDark}>I am going</span>
          </div>
        ) : (
          <div>
            <div className={`${styles.icon} ${iconStyles.checkOutline} ${globalStyles.primary}`} />
            <span className={globalStyles.textPrimary}>{data.going || 0} Going</span>
          </div>
        )}
        {data.isLiked ? (
          <div>
            <div className={`${styles.icon} ${iconStyles.like} ${globalStyles.redLight}`} />
            <span className={globalStyles.textPrimaryDark}>I like it</span>
          </div>
        ) : (
          <div>
            <div className={`${styles.icon} ${iconStyles.likeOutline} ${globalStyles.primary}`} />
            <span className={globalStyles.textPrimary}>{data.likes || 0} Likes</span>
          </div>
        )}
      </div>
    </div>
  );
}
