import React from 'react';
import Comments from '../../../component/Comments';
import { CommentFooter } from '../../../component/Footer';
import TabContent from '../../../component/TabContent';
import { ICommentData } from '../../../interfaces/data';

interface IProps {
  comments: ICommentData[];
  selected: boolean;
}

export default function CommentsTab(props: IProps) {
  const { selected, comments } = props;
  return (
    <TabContent selected={selected}>
      <Comments comments={comments} />
      <CommentFooter />
    </TabContent>
  );
}
