import React from 'react';
import { imageAssetURL } from '../enum/asset';
import styles from './Login.module.css';

export default function Login() {
  return (
    <div>
      <img className={styles.bg} src={imageAssetURL.LoginBg} alt="Street Dancing" />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3>FIND THE MOST LOVED ACTIVITIES</h3>
            <h1>BLACK CAT</h1>
            <div className={styles.logoBorder}>
              <div className={styles.logo} />
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.email}>
            <div className={styles.inputIcon} />
            <input placeholder="Email" />
          </div>
          <div className={styles.password}>
            <div className={styles.inputIcon} />
            <input placeholder="Password" />
          </div>
        </div>
        <div className={styles.signIn}>SIGN IN</div>
      </div>
    </div>
  );
}
