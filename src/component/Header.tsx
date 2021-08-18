import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} ${globalStyles.primary}`}>
      <div>
        <div className={`${styles.logo} ${iconStyles.search} ${globalStyles.black}`} />
        <div className={`${styles.logo} ${iconStyles.logoCat} ${globalStyles.complement}`} />
        <div className={`${styles.logo} ${iconStyles.user} ${globalStyles.black}`} />
      </div>
    </header>
  );
}
