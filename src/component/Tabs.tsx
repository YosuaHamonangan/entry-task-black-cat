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

  return (
    <div className="tabs">
      {tabsInfo.map(({ key, icon, text }, i) => (
        <>
          <div className="tab-separator" />

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
          </button>
        </>
      ))}
    </div>
  );
}
