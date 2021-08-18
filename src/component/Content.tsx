import React from 'react';
import globalStyles from '../enum/globalStyles';
import styles from './Header.module.css';

export default function Content({ children }: any) {
  return (
    <div className={`${globalStyles.backgroud} ${styles.content}`}>
      <div>{children}</div>
    </div>
  );
}
