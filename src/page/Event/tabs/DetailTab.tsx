import React from 'react';
import Comments from '../../../component/Comments';
import Icon from '../../../component/Icon';
import LabeledIcon from '../../../component/LabeledIcon';
import ProfilePicture from '../../../component/ProfilePicture';
import TabContent from '../../../component/TabContent';
import globalStyles from '../../../enum/globalStyles';
import iconStyles from '../../../enum/iconStyles';
import { IEventData, ICommentData, IParticipantsData } from '../../../interfaces/res';
import { getFullDateString, getTimeString } from '../../../util/date';
import styles from '../Event.module.css';

export default function DetailTab(props: {
  event: IEventData;
  comments: ICommentData[];
  participants: IParticipantsData;
  selected: boolean;
}) {
  const { event, comments, selected, participants } = props;
  return (
    <TabContent selected={selected}>
      <div className={`${styles.marginSide} ${styles.borderBottom}`}>
        <div className={styles.description}>{event.description}</div>
      </div>

      <div className={`${styles.marginSide} ${styles.borderBottom}`}>
        <div className={styles.header}>When</div>
        <div className={styles.sections}>
          <div>
            <LabeledIcon
              icon={iconStyles.dateFrom}
              iconColor={globalStyles.complement}
              iconWidth="1em"
              iconHeight="1em"
              gap="0.5em"
              text={getFullDateString(event.start)}
            />
            <div className={styles.startTime}>
              {getTimeString(event.start)
                .split(' ')
                .map((str, i) => (
                  <span key={i}>{str}</span>
                ))}
            </div>
          </div>
          <div className={styles.sectionsSeparator} />
          <div>
            <LabeledIcon
              icon={iconStyles.dateTo}
              iconColor={globalStyles.complement}
              iconWidth="1em"
              iconHeight="1em"
              gap="0.5em"
              text={getFullDateString(event.end!)}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.paddingSide} ${styles.borderBottom}`}>
        <div className={styles.header}>Where</div>
        <div className={styles.location}>{event.location}</div>
        <div className={styles.address}>{event.address}</div>
        <img className={styles.map} src={event.coordinate} alt="location" />
      </div>

      <div className={`${styles.marginSide} ${styles.borderBottom} ${styles.users}`}>
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

        <div className={styles.borderBottom} />
        <div className={styles.borderBottom} />

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

      <div className={`${styles.paddingSide} ${styles.borderBottom}`}>
        {<Comments comments={comments} />}
      </div>
      <div className={styles.footer}>
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
    </TabContent>
  );
}
