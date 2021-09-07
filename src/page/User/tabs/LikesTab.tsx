import React from 'react';
import TabContent from '../../../component/TabContent';

interface IProps {
  selected: boolean;
}

export default function LikesTab(props: IProps) {
  const { selected } = props;
  return <TabContent selected={selected}>LikesTab</TabContent>;
}
