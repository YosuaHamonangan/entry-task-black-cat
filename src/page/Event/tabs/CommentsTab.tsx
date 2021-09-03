import React from 'react';
import TabContent from '../../../component/TabContent';

export default function CommentsTab(props: { selected: boolean }) {
  const { selected } = props;
  return <TabContent selected={selected}>Comment</TabContent>;
}
