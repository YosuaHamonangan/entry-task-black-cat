import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { imageAssetURL } from '../enum/asset';
import iconStyles from '../enum/iconStyles';
import styles from './Login.module.css';

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();
  function onClick() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    console.log(data.get('email'));

    history.push('/');
  }
  return (
    <div>
      <img className={styles.bg} src={imageAssetURL.LoginBg} alt="Street Dancing" />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3>FIND THE MOST LOVED ACTIVITIES</h3>
            <h1>BLACK CAT</h1>
            <div className={styles.logoBorder}>
              <div className={`${styles.logo} ${iconStyles.logoCat}`} />
            </div>
          </div>
        </div>
        <form className={styles.form} ref={formRef}>
          <div className={styles.email}>
            <div className={`${styles.inputIcon} ${iconStyles.email}`} />
            <input name="email" placeholder="Email" />
          </div>
          <div>
            <div className={`${styles.inputIcon} ${iconStyles.password}`} />
            <input name="password" placeholder="Password" />
          </div>
        </form>
        <button className={styles.signIn} onClick={onClick}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}
