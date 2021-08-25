import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import { selectShowSidemenu, toggleSidemenu } from '../reducer/app';
import styles from './PageTemplate.module.css';

export default function PageTemplate({ sidemenu, children }: any) {
  const showSidemenu = useAppSelector(selectShowSidemenu);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <div className={`${styles.sidemenu} ${showSidemenu ? '' : styles.hide}`}>{sidemenu}</div>
      <div>
        <header className={`${styles.header} ${globalStyles.primary}`}>
          <div>
            {sidemenu ? (
              <button onClick={() => dispatch(toggleSidemenu())}>
                <div className={`${styles.logo} ${iconStyles.search} ${globalStyles.black}`} />
              </button>
            ) : (
              <Link to="/">
                <div className={`${styles.logo} ${iconStyles.home} ${globalStyles.black}`} />
              </Link>
            )}
            <div className={`${styles.logo} ${iconStyles.logoCat} ${globalStyles.complement}`} />
            <div className={`${styles.logo} ${iconStyles.user} ${globalStyles.black}`} />
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
