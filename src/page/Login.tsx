import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useHistory } from 'react-router-dom';
import { imageAssetURL } from '../enum/asset';
import iconStyles from '../enum/iconStyles';
import styles from './Login.module.css';
import { login, selectCurrentUser, selectLoginError } from '../reducer/user';
import { errorKey } from '../enum/error';

export default function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [inputError, setInputError] = useState<{ key: errorKey; message: string } | null>(null);
  const loginError = useAppSelector(selectLoginError);
  const error = loginError || inputError;

  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  function onClick() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);

    const email = (data.get('email') as string).trim();
    if (!email) {
      setInputError({
        key: errorKey.LOGIN_EMAIL,
        message: "Email can't be empty",
      });
      return;
    }

    const password = data.get('password') as string;
    if (!password) {
      setInputError({
        key: errorKey.LOGIN_PASSWORD,
        message: "Email can't be empty",
      });
      return;
    }

    setInputError(null);
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (user) history.push('/');
  }, [history, user]);

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
          {error?.key === errorKey.LOGIN_FORM && <div>{error.message}</div>}
          <div className={styles.email}>
            <div className={`${styles.inputIcon} ${iconStyles.email}`} />
            <input name="email" placeholder="Email" />
            {error?.key === errorKey.LOGIN_EMAIL && <div>{error.message}</div>}
          </div>
          <div>
            <div className={`${styles.inputIcon} ${iconStyles.password}`} />
            <input name="password" placeholder="Password" />
            {error?.key === errorKey.LOGIN_PASSWORD && <div>{error.message}</div>}
          </div>
        </form>
        <button className={styles.signIn} onClick={onClick}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}
