import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { selectShowSidemenu, toggleSidemenu } from '../reducer/app';
import { selectCurrentUser } from '../reducer/user';
import Icon from './Icon';
import styles from './PageTemplate.module.css';
import ProfilePicture from './ProfilePicture';

export default function PageTemplate({ sidemenu, children }: any) {
  const dispatch = useAppDispatch();
  const showSidemenu = useAppSelector(selectShowSidemenu);
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className={styles.container}>
      <div className={`${styles.sidemenu} ${showSidemenu ? '' : styles.hide}`}>{sidemenu}</div>
      <div>
        <header className={`${styles.header} ${globalStyles.primary}`}>
          <div>
            {sidemenu ? (
              <button onClick={() => dispatch(toggleSidemenu())}>
                <Icon className={styles.logo} icon={iconStyles.search} color={globalStyles.black} />
              </button>
            ) : (
              <Link to="/">
                <Icon className={styles.logo} icon={iconStyles.home} color={globalStyles.black} />
              </Link>
            )}
            <Icon
              className={styles.logo}
              icon={iconStyles.logoCat}
              color={globalStyles.complement}
            />
            {user && (
              <Link to={`/user/${user.id}`}>
                <ProfilePicture className={styles.logo} src={user.picture} />
              </Link>
            )}
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
