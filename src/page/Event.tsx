import React, { useEffect } from 'react';
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
import { getFullDateString, getTimeString } from '../util/date';

export default function Event() {
  const dispatch = useAppDispatch();

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
        {event && (
          <>
            <div className={`${styles.paddingSide} ${styles.borderBottom}`}>
              <div className={styles.channel}>{event.channel.name}</div>
              <h2 className={styles.title}>{event.title}</h2>
              <div>
                <Icon className={styles.userPicture} icon={iconStyles.user} />
                <div className={styles.userDetail}>
                  <div className={styles.username}>{event.user.username}</div>
                  <div className={styles.published}>Published 2 days ago</div>
                </div>
              </div>
            </div>

            <div className={`${styles.paddingSide} ${styles.borderBottom} ${styles.sections}`}>
              <LabeledIcon
                icon={iconStyles.user}
                iconColor={globalStyles.black}
                iconWidth="1.5em"
                iconHeight="1.5em"
                gap="0.5em"
                text="Details"
              />
              <div className={styles.sectionsSeparator} />
              <LabeledIcon
                icon={iconStyles.people}
                iconColor={globalStyles.black}
                iconWidth="1.5em"
                iconHeight="1.5em"
                gap="0.5em"
                text="Participants"
              />
              <div className={styles.sectionsSeparator} />
              <LabeledIcon
                icon={iconStyles.user}
                iconColor={globalStyles.black}
                iconWidth="1.5em"
                iconHeight="1.5em"
                gap="0.5em"
                text="Comments"
              />
            </div>

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
              {comments && <Comments comments={comments} />}
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
          </>
        )}
      </div>
    </PageTemplate>
  );
}
