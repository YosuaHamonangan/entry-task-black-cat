import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import Comments from '../../../component/Comments';
import { JoinFooter } from '../../../component/Footer';
import LabeledIcon from '../../../component/LabeledIcon';
import Participants from '../../../component/Participants';
import { HorizontalSeparator, VerticalSeparator } from '../../../component/Separator';
import TabContent from '../../../component/TabContent';
import globalStyles from '../../../enum/globalStyles';
import iconStyles from '../../../enum/iconStyles';
import { IEventData, IParticipantsData } from '../../../interfaces/data';
import { getFullDateString, getTimeString } from '../../../util/date';
import { selectCommentList } from '../../../reducer/commentList';
import styles from './DetailTab.module.css';

interface IProps {
  event: IEventData;
  participants: IParticipantsData;
  selected: boolean;
}

export default function DetailTab(props: IProps) {
  const { event, selected, participants } = props;

  const comments = useAppSelector(selectCommentList).list.slice(0, 5);

  return (
    <TabContent selected={selected}>
      <div className={styles.details}>
        <div className={styles.description}>{event.description}</div>

        <HorizontalSeparator />

        <div className={styles.headerTitle}>When</div>
        <div className={styles.time}>
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

          <VerticalSeparator />

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

        <HorizontalSeparator />

        <div className={styles.headerTitle}>Where</div>
        <div className={styles.location}>{event.location}</div>
        <div className={styles.address}>{event.address}</div>
        <img className={styles.map} src={event.coordinate} alt="location" />
      </div>

      <HorizontalSeparator />
      <Participants participants={participants} />
      <HorizontalSeparator />
      <Comments comments={comments} />

      <JoinFooter />
    </TabContent>
  );
}
