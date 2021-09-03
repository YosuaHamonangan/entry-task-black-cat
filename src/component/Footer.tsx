import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import Icon from './Icon';
import LabeledIcon from './LabeledIcon';
import styles from './Footer.module.css';

export function JoinFooter() {
  return (
    <div className={styles.joinFooter}>
      <button onClick={() => console.log('comment')}>
        <Icon icon={iconStyles.noActivity} width="2em" height="2em" />
      </button>
      <button onClick={() => console.log('like')}>
        <Icon icon={iconStyles.likeOutline} width="2em" height="2em" />
      </button>
      <button className={styles.join} onClick={() => console.log('join')}>
        <LabeledIcon
          icon={iconStyles.checkOutline}
          iconColor={globalStyles.complementDark2}
          iconWidth="2em"
          iconHeight="2em"
          gap="0.5em"
          text="Join"
        />
      </button>
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
