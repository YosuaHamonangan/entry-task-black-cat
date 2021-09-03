import React from 'react';
import { JoinFooter } from '../../../component/Footer';
import TabContent from '../../../component/TabContent';

export default function ParticipantsTab(props: { selected: boolean }) {
  const { selected } = props;
  return (
    <TabContent selected={selected}>
      Participant
      <JoinFooter />
    </TabContent>
  );
}
