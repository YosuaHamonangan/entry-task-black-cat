import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  loadEvent,
  loadParticipants,
  selectCurrentEvent,
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
import { EVENT_TABS } from '../../enum/tabs';
import { selectSelectedEventTab, setSelectedEventTab } from '../../reducer/app';

export default function Event() {
  const dispatch = useAppDispatch();

  const selectedTab = useAppSelector(selectSelectedEventTab);
  function setSelectedTab(tab: EVENT_TABS) {
    dispatch(setSelectedEventTab(tab));
  }

  // Make sure the first tab opened is detail tab
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSelectedTab(EVENT_TABS.DETAIL), []);

  const { id } = useParams<{ id: string }>();
  let event = useAppSelector(selectCurrentEvent);
  let participants = useAppSelector(selectParticipants);

  if (event?.id !== id) {
    event = null;
  }

  if (participants && participants.eventId !== id) {
    participants = null;
  }

  useEffect(() => {
    if (!event) dispatch(loadEvent(id));
    if (!participants) dispatch(loadParticipants(id));
  }, [dispatch, id, event, participants]);

  return (
    <PageTemplate>
      <div className={styles.container}>
        {event && participants && (
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
                  key: EVENT_TABS.DETAIL,
                  icon: iconStyles.infoOutline,
                  iconSelected: iconStyles.info,
                  text: 'Details',
                },
                {
                  key: EVENT_TABS.PARTICIPANTS,
                  icon: iconStyles.peopleOutline,
                  iconSelected: iconStyles.people,
                  text: 'Participants',
                },
                {
                  key: EVENT_TABS.COMMENTS,
                  icon: iconStyles.commentOutline,
                  iconSelected: iconStyles.comment,
                  text: 'Comments',
                },
              ]}
            />
            <DetailTab
              selected={selectedTab === EVENT_TABS.DETAIL}
              event={event}
              participants={participants}
            />
            <ParticipantsTab
              selected={selectedTab === EVENT_TABS.PARTICIPANTS}
              participants={participants}
            />
            <CommentsTab selected={selectedTab === EVENT_TABS.COMMENTS} />
          </>
        )}
      </div>
    </PageTemplate>
  );
}
