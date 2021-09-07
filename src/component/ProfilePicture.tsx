import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import Icon from './Icon';

interface IProps {
  className?: string;
  src?: string | null;
  size?: number | string;
}

export default function ProfilePicture(props: IProps) {
  return props.src ? (
    <img
      className={`${props.className || ''}`}
      src={props.src}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: '100%',
      }}
      alt="profile"
    />
  ) : (
    <Icon
      className={`${props.className || ''}`}
      icon={iconStyles.user}
      color={globalStyles.black}
      width={props.size}
      height={props.size}
    />
  );
}
