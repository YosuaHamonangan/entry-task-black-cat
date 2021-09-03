import React from 'react';
import Comments from '../../../component/Comments';
import { JoinFooter } from '../../../component/Footer';
import Participants from '../../../component/Participants';
import { HorizontalSeparator } from '../../../component/Separator';
import TabContent from '../../../component/TabContent';
import { ICommentData, IParticipantsData } from '../../../interfaces/res';

interface IProps {
  comments: ICommentData[];
  participants: IParticipantsData;
  selected: boolean;
}

export default function ParticipantsTab(props: IProps) {
  const { selected, participants, comments } = props;
  return (
    <TabContent selected={selected}>
      <Participants participants={participants} />
      <HorizontalSeparator />
      <Comments comments={comments} />
      <JoinFooter />
    </TabContent>
  );
}
