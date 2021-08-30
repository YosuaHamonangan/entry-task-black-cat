import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';

interface IProps {
  className?: string;
  icon: iconStyles;
  color?: globalStyles;
  width?: number | string;
  height?: number | string;
}

export default function Icon(props: IProps) {
  const { className = '', icon, color = globalStyles.black, width, height } = props;
  return <div className={`${icon} ${color} ${className}`} style={{ width, height }} />;
}
