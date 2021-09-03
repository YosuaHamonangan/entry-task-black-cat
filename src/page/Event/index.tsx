import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  loadEvent,
  loadComments,
  loadParticipants,
  selectCurrentEvent,
  selectCurrentComments,
  selectParticipants,
} from '../../reducer/event';
import PageTemplate from '../../component/PageTemplate';
import Icon from '../../component/Icon';
import iconStyles from '../../enum/iconStyles';
import globalStyles from '../../enum/globalStyles';
import LabeledIcon from '../../component/LabeledIcon';
import { getTimeDiffString } from '../../util/date';
import DetailTab from './tabs/DetailTab';
import styles from './Event.module.css';
import ParticipantsTab from './tabs/ParticipantsTab';
import CommentsTab from './tabs/CommentsTab';

// eslint-disable-next-line no-unused-vars
enum TABS {
  // eslint-disable-next-line no-unused-vars
  DETAIL,
  // eslint-disable-next-line no-unused-vars
  PARTICIPANTS,
  // eslint-disable-next-line no-unused-vars
  COMMENTS,
}

export default function Event() {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.DETAIL);

  const { id } = useParams<{ id: string }>();
  let event = useAppSelector(selectCurrentEvent);
  let comments = useAppSelector(selectCurrentComments);
  let participants = useAppSelector(selectParticipants);

  if (event?.id !== id) {
    event = null;
  }

  if (comments && comments[0]?.event.id !== id) {
    comments = null;
  }

  if (participants && participants.eventId !== id) {
    participants = null;
  }

  useEffect(() => {
    if (!event) dispatch(loadEvent(id));
    if (!comments) dispatch(loadComments(id));
    if (!participants) dispatch(loadParticipants(id));
  }, [dispatch, id, event, comments, participants]);

  return (
    <PageTemplate>
      <div className={styles.container}>
        {event && comments && participants && (
          <>
            <div className={`${styles.paddingSide} ${styles.borderBottom}`}>
              <div className={styles.channel}>{event.channel.name}</div>
              <h2 className={styles.title}>{event.title}</h2>
              <div>
                <Icon className={styles.userPicture} icon={iconStyles.user} />
                <div className={styles.userDetail}>
                  <div className={styles.username}>{event.user.username}</div>
                  <div className={styles.published}>
                    Published {getTimeDiffString(event.published)}
                  </div>
                </div>
              </div>
            </div>

            <Tabs onSelect={(tab) => setSelectedTab(tab)} selected={selectedTab} />
            <DetailTab
              selected={selectedTab === TABS.DETAIL}
              event={event}
              comments={comments}
              participants={participants}
            />
            <ParticipantsTab selected={selectedTab === TABS.PARTICIPANTS} />
            <CommentsTab selected={selectedTab === TABS.COMMENTS} />
          </>
        )}
      </div>
    </PageTemplate>
  );
}

function Tabs(props: {
  selected: TABS;
  // eslint-disable-next-line no-unused-vars
  onSelect: (tab: TABS) => void;
}) {
  const { onSelect, selected } = props;
  return (
    <div className={`${styles.paddingSide} ${styles.borderBottom} ${styles.sections}`}>
      <button
        className={`${styles.tab} ${selected === TABS.DETAIL ? styles.selected : ''}`}
        onClick={() => onSelect(TABS.DETAIL)}
      >
        <LabeledIcon
          icon={iconStyles.user}
          iconColor={selected === TABS.DETAIL ? globalStyles.complementDark1 : globalStyles.black}
          iconWidth="1.5em"
          iconHeight="1.5em"
          gap="0.5em"
          text="Details"
        />
      </button>

      <div className={styles.sectionsSeparator} />

      <button
        className={`${styles.tab} ${selected === TABS.PARTICIPANTS ? styles.selected : ''}`}
        onClick={() => onSelect(TABS.PARTICIPANTS)}
      >
        <LabeledIcon
          icon={iconStyles.people}
          iconColor={
            selected === TABS.PARTICIPANTS ? globalStyles.complementDark1 : globalStyles.black
          }
          iconWidth="1.5em"
          iconHeight="1.5em"
          gap="0.5em"
          text="Participants"
        />
      </button>

      <div className={styles.sectionsSeparator} />

      <button
        className={`${styles.tab} ${selected === TABS.COMMENTS ? styles.selected : ''}`}
        onClick={() => onSelect(TABS.COMMENTS)}
      >
        <LabeledIcon
          icon={iconStyles.commentOutline}
          iconColor={selected === TABS.COMMENTS ? globalStyles.complementDark1 : globalStyles.black}
          iconWidth="1.5em"
          iconHeight="1.5em"
          gap="0.5em"
          text="Comments"
        />
      </button>
    </div>
  );
}
