import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import LabeledIcon from './LabeledIcon';
import './Tabs.css';

export default function Tabs<KEYS>(props: {
  selected: KEYS;
  // eslint-disable-next-line no-unused-vars
  onSelect: (tab: KEYS) => void;
  tabsInfo: {
    key: KEYS;
    icon: iconStyles;
    text: string;
  }[];
}) {
  const { onSelect, selected, tabsInfo } = props;

  const content: any = [];
  tabsInfo.forEach(({ key, icon, text }, i) => {
    content.push(
      <button
        key={i}
        className={`tab-item ${selected === key ? 'selected' : ''}`}
        onClick={() => onSelect(key)}
      >
        <LabeledIcon
          icon={icon}
          iconColor={selected === key ? globalStyles.complementDark1 : globalStyles.black}
          iconWidth="1.5em"
          iconHeight="1.5em"
          gap="0.5em"
          text={text}
        />
      </button>,
    );
    content.push(<div key={`s${i}`} className="tab-separator" />);
  });

  // Remove last separator
  content.pop();

  return <div className="tabs">{content}</div>;
}
