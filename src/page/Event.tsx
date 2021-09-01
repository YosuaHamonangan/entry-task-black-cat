import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  loadEvent,
  loadComments,
  selectCurrentEvent,
  selectCurrentComments,
} from '../reducer/event';
import PageTemplate from '../component/PageTemplate';
import Icon from '../component/Icon';
import styles from './Event.module.css';
import iconStyles from '../enum/iconStyles';
import globalStyles from '../enum/globalStyles';
import LabeledIcon from '../component/LabeledIcon';
import Comments from '../component/Comments';
import { getFullDateString, getTimeString, getTimeDiffString } from '../util/date';
import { ICommentData, IEventData } from '../interfaces/res';

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

  if (event?.id !== id) {
    event = null;
  }

  if (comments && comments[0]?.event.id !== id) {
    comments = null;
  }

  useEffect(() => {
    if (!event) dispatch(loadEvent(id));
    if (!comments) dispatch(loadComments(id));
  }, [dispatch, id, event, comments]);

  return (
    <PageTemplate>
      <div className={styles.container}>
        {event && comments && (
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
            <DetailTab selected={selectedTab === TABS.DETAIL} event={event} comments={comments} />
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

function TabContent(props: { selected: boolean; children: any }) {
  const { selected, children } = props;
  return (
    <div className={`${styles.tabContent} ${selected ? styles.selected : ''}`}>{children}</div>
  );
}

function DetailTab(props: { event: IEventData; comments: ICommentData[]; selected: boolean }) {
  const { event, comments, selected } = props;
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
          text={`${34} going`}
        />
        <div className={styles.userList}>
          <Icon icon={iconStyles.user} width="2em" height="2em" />
          <Icon icon={iconStyles.user} width="2em" height="2em" />
          <Icon icon={iconStyles.user} width="2em" height="2em" />
        </div>

        <div className={styles.borderBottom} />
        <div className={styles.borderBottom} />

        <LabeledIcon
          icon={iconStyles.likeOutline}
          iconWidth="1.5em"
          iconHeight="1.5em"
          gap="0.5em"
          text={`${34} likes`}
        />
        <div className={styles.userList}>
          <Icon icon={iconStyles.user} width="2em" height="2em" />
          <Icon icon={iconStyles.user} width="2em" height="2em" />
          <Icon icon={iconStyles.user} width="2em" height="2em" />
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

function ParticipantsTab(props: { selected: boolean }) {
  const { selected } = props;
  return <TabContent selected={selected}>Participant</TabContent>;
}

function CommentsTab(props: { selected: boolean }) {
  const { selected } = props;
  return <TabContent selected={selected}>Comment</TabContent>;
}
