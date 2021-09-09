import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import Comments from '../../../component/Comments';
import { JoinFooter } from '../../../component/Footer';
import Participants from '../../../component/Participants';
import { HorizontalSeparator } from '../../../component/Separator';
import TabContent from '../../../component/TabContent';
import { IParticipantsData } from '../../../interfaces/data';
import { selectCommentList } from '../../../reducer/commentList';

interface IProps {
  participants: IParticipantsData;
  selected: boolean;
}

export default function ParticipantsTab(props: IProps) {
  const { selected, participants } = props;
  const comments = useAppSelector(selectCommentList).list.slice(0, 5);

  return (
    <TabContent selected={selected}>
      <Participants participants={participants} />
      <HorizontalSeparator />
      <Comments comments={comments} />
      <JoinFooter />
    </TabContent>
  );
}
