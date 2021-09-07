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
import { getTimeDiffString } from '../../util/date';
import DetailTab from './tabs/DetailTab';
import styles from './Event.module.css';
import ParticipantsTab from './tabs/ParticipantsTab';
import CommentsTab from './tabs/CommentsTab';
import Tabs from '../../component/Tabs';

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
            <div className={styles.header}>
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

            <Tabs
              onSelect={(tab) => setSelectedTab(tab)}
              selected={selectedTab}
              tabsInfo={[
                {
                  key: TABS.DETAIL,
                  icon: iconStyles.infoOutline,
                  iconSelected: iconStyles.info,
                  text: 'Details',
                },
                {
                  key: TABS.PARTICIPANTS,
                  icon: iconStyles.peopleOutline,
                  iconSelected: iconStyles.people,
                  text: 'Participants',
                },
                {
                  key: TABS.COMMENTS,
                  icon: iconStyles.commentOutline,
                  iconSelected: iconStyles.comment,
                  text: 'Comments',
                },
              ]}
            />
            <DetailTab
              selected={selectedTab === TABS.DETAIL}
              event={event}
              comments={comments}
              participants={participants}
            />
            <ParticipantsTab
              selected={selectedTab === TABS.PARTICIPANTS}
              comments={comments}
              participants={participants}
            />
            <CommentsTab selected={selectedTab === TABS.COMMENTS} comments={comments} />
          </>
        )}
      </div>
    </PageTemplate>
  );
}
