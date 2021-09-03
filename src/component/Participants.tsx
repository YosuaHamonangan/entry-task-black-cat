import React from 'react';
import iconStyles from '../enum/iconStyles';
import { IParticipantsData } from '../interfaces/res';
import LabeledIcon from './LabeledIcon';
import ProfilePicture from './ProfilePicture';
import styles from './Participants.module.css';
import { HorizontalSeparator } from './Separator';

interface IProps {
  participants: IParticipantsData;
}

export default function Participants({ participants }: IProps) {
  return (
    <div className={styles.participants}>
      <LabeledIcon
        icon={iconStyles.checkOutline}
        iconWidth="1.5em"
        iconHeight="1.5em"
        gap="0.5em"
        text={`${participants.going.length} going`}
      />
      <div className={styles.userList}>
        {participants.going.map(({ picture }, i) => (
          <ProfilePicture key={i} src={picture} size="2em" />
        ))}
      </div>

      <HorizontalSeparator />
      <HorizontalSeparator />

      <LabeledIcon
        icon={iconStyles.likeOutline}
        iconWidth="1.5em"
        iconHeight="1.5em"
        gap="0.5em"
        text={`${participants.likes.length} likes`}
      />
      <div className={styles.userList}>
        {participants.likes.map(({ picture }, i) => (
          <ProfilePicture key={i} src={picture} size="2em" />
        ))}
      </div>
    </div>
  );
}
