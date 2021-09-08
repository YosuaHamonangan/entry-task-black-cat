import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import Icon from './Icon';
import './LabeledIcon.css';

interface IProps {
  className?: string;
  icon: iconStyles;
  iconColor?: globalStyles;
  iconWidth?: number | string;
  iconHeight?: number | string;
  text: any;
  textSize?: number | string;
  textColor?: string;
  gap?: number | string;
}

export default function LabeledIcon(props: IProps) {
  return (
    <div className={`labeled-icon ${props.className || ''}`}>
      <span>
        <Icon
          className="icon"
          icon={props.icon}
          color={props.iconColor}
          width={props.iconWidth}
          height={props.iconHeight}
        />
        <span
          className={`label ${props.textColor || ''}`}
          style={{ fontSize: props.textSize, marginLeft: props.gap }}
        >
          {props.text}
        </span>
      </span>
    </div>
  );
}
