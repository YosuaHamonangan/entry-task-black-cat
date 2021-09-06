import React from 'react';

interface IProps {
  className?: string;
  src: string | undefined;
  size?: number | string;
}

export default function ProfilePicture(props: IProps) {
  return (
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
  );
}
