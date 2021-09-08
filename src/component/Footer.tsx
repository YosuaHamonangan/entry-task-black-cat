import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import Icon from './Icon';
import LabeledIcon from './LabeledIcon';
import styles from './Footer.module.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentEvent, setIsGoing, setIsLike } from '../reducer/event';
import { setSelectedEventTab } from '../reducer/app';
import { EVENT_TABS } from '../enum/tabs';

export function JoinFooter() {
  const dispatch = useAppDispatch();

  const event = useAppSelector(selectCurrentEvent);

  return (
    <div className={styles.joinFooter}>
      <button onClick={() => dispatch(setSelectedEventTab(EVENT_TABS.COMMENTS))}>
        <Icon icon={iconStyles.commentSingle} width="2em" height="2em" />
      </button>
      {event && (
        <button onClick={() => dispatch(setIsLike({ eventId: event.id, like: !event.is_like }))}>
          <Icon
            icon={event.is_like ? iconStyles.like : iconStyles.likeOutline}
            color={event.is_like ? globalStyles.complement : globalStyles.black}
            width="2em"
            height="2em"
          />
        </button>
      )}
      {event && (
        <button
          className={styles.join}
          onClick={() => dispatch(setIsGoing({ eventId: event.id, going: !event.is_going }))}
        >
          <LabeledIcon
            icon={event.is_going ? iconStyles.check : iconStyles.checkOutline}
            iconColor={event.is_going ? globalStyles.primary : globalStyles.complementDark2}
            iconWidth="2em"
            iconHeight="2em"
            gap="0.5em"
            textColor={event.is_going ? globalStyles.textPrimary : globalStyles.textComplementDark2}
            text={event.is_going ? 'I am going' : 'Join'}
          />
        </button>
      )}
    </div>
  );
}

export function CommentFooter() {
  return (
    <div className={styles.commentFooter}>
      <button onClick={() => console.log('cancel')}>
        <Icon
          icon={iconStyles.cross}
          color={globalStyles.complement}
          width="1.5em"
          height="1.5em"
        />
      </button>
      <div className={styles.commentInput}>
        <input placeholder="Leave your comment here" />
      </div>
      <button className={styles.send} onClick={() => console.log('join')}>
        <Icon icon={iconStyles.send} color={globalStyles.primary} width="3em" height="3em" />
      </button>
    </div>
  );
}
