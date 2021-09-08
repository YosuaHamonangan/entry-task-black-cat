import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { ICommentData } from '../interfaces/data';
import { getTimeDiffString } from '../util/date';
import styles from './Comments.module.css';
import Icon from './Icon';

interface IProps {
  comments: ICommentData[];
}

export default function Comments({ comments }: IProps) {
  return (
    <div className={styles.container}>
      {comments.map((data, i) => (
        <div key={i} className={styles.card}>
          <img className={styles.picture} src={data.user.picture} alt="profile" />
          <div className={styles.username}>{data.user.username}</div>
          <div className={styles.time}>{getTimeDiffString(data.time)}</div>
          <div />
          <Icon
            icon={iconStyles.reply}
            color={globalStyles.complement}
            width="1.5em"
            height="1.5em"
          />
          <div className={styles.comment}>{data.comment}</div>
        </div>
      ))}
    </div>
  );
}
