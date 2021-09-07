import React from 'react';
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
    iconSelected: iconStyles;
    text: string;
  }[];
}) {
  const { onSelect, selected, tabsInfo } = props;

  const content: any = [];
  tabsInfo.forEach(({ key, iconSelected, icon, text }, i) => {
    const isSelected = selected === key;
    content.push(
      <button
        key={i}
        className={`tab-item ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(key)}
      >
        <LabeledIcon
          icon={isSelected ? iconSelected : icon}
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
