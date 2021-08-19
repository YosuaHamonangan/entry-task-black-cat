import React, { useState } from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import styles from './PageTemplate.module.css';

export default function PageTemplate({ sidemenu, children }: any) {
  const [showSidemenu, setShowSidemenu] = useState(false);
  return (
    <div className={styles.container}>
      <div className={`${styles.sidemenu} ${showSidemenu ? '' : styles.hide}`}>{sidemenu}</div>
      <div>
        <header className={`${styles.header} ${globalStyles.primary}`}>
          <div>
            {sidemenu ? (
              <button
                onClick={() => {
                  setShowSidemenu(!showSidemenu);
                }}
              >
                <div className={`${styles.logo} ${iconStyles.search} ${globalStyles.black}`} />
              </button>
            ) : (
              <div className={`${styles.logo} ${iconStyles.home} ${globalStyles.black}`} />
            )}
            <div className={`${styles.logo} ${iconStyles.logoCat} ${globalStyles.complement}`} />
            <div className={`${styles.logo} ${iconStyles.user} ${globalStyles.black}`} />
          </div>
        </header>
        <main className={`${globalStyles.background} ${styles.main}`}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}
