import React from 'react';
import './TabContent.css';

export default function TabContent(props: { selected: boolean; children: any }) {
  const { selected, children } = props;
  return <div className={`tab-content ${selected ? 'selected' : ''}`}>{children}</div>;
}
