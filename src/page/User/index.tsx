import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import LabeledIcon from '../../component/LabeledIcon';
import PageTemplate from '../../component/PageTemplate';
import ProfilePicture from '../../component/ProfilePicture';
import Tabs from '../../component/Tabs';
import globalStyles from '../../enum/globalStyles';
import iconStyles from '../../enum/iconStyles';
import { logout, selectCurrentUser } from '../../reducer/user';
import LikesTab from './tabs/LikesTab';
import GoingTab from './tabs/GoingTab';
import PastTab from './tabs/PastTab';
import styles from './User.module.css';

// eslint-disable-next-line no-unused-vars
enum TABS {
  // eslint-disable-next-line no-unused-vars
  LIKES,
  // eslint-disable-next-line no-unused-vars
  GOING,
  // eslint-disable-next-line no-unused-vars
  PAST,
}

export default function User() {
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.LIKES);
  const user = useAppSelector(selectCurrentUser);

  function onLogout() {
    dispatch(logout());
  }

  return (
    <PageTemplate>
      {user && (
        <>
          <div className={styles.header}>
            <ProfilePicture className={styles.picture} src={user.picture} size="6em" />
            <div className={styles.username}>{user.username}</div>
            <LabeledIcon
              className={styles.email}
              icon={iconStyles.email}
              iconWidth="1.4em"
              iconHeight="1.4em"
              iconColor={globalStyles.primary}
              text={user.email}
              textSize="1.1em"
              textColor={globalStyles.textPrimary}
              gap="0.5em"
            />
            <button className={styles.logout} onClick={onLogout}>
              Logout
            </button>
          </div>
          <Tabs
            onSelect={(tab) => setSelectedTab(tab)}
            selected={selectedTab}
            tabsInfo={[
              {
                key: TABS.LIKES,
                icon: iconStyles.likeOutline,
                iconSelected: iconStyles.like,
                text: 'Likes',
              },
              {
                key: TABS.GOING,
                icon: iconStyles.checkOutline,
                iconSelected: iconStyles.check,
                text: 'Going',
              },
              {
                key: TABS.PAST,
                icon: iconStyles.pastOutline,
                iconSelected: iconStyles.past,
                text: 'Past',
              },
            ]}
          />
          <div className={styles.tabContent}>
            <LikesTab selected={selectedTab === TABS.LIKES} />
            <GoingTab selected={selectedTab === TABS.GOING} />
            <PastTab selected={selectedTab === TABS.PAST} />
          </div>
        </>
      )}
    </PageTemplate>
  );
}
