import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import Comments from '../../../component/Comments';
import { CommentFooter } from '../../../component/Footer';
import InfiniteScrolling from '../../../component/InfiniteScrolling';
import TabContent from '../../../component/TabContent';
import { loadCommentList, resetComments, selectCommentList } from '../../../reducer/commentList';

interface IProps {
  selected: boolean;
}

export default function CommentsTab(props: IProps) {
  const { selected } = props;
  const { list: comments } = useAppSelector(selectCommentList);

  return (
    <TabContent selected={selected}>
      <InfiniteScrolling
        loadAsyncThunk={loadCommentList}
        selectState={selectCommentList}
        resetAction={resetComments()}
      >
        <Comments comments={comments} />
      </InfiniteScrolling>
      <CommentFooter />
    </TabContent>
  );
}
