import React from 'react';
import TabContent from '../../../component/TabContent';
import { useAppSelector } from '../../../app/hooks';
import {
  selectPastCommentList,
  loadPastCommentList,
  resetPastComments,
} from '../../../reducer/pastCommentList';
import Comments from '../../../component/Comments';
import Icon from '../../../component/Icon';
import iconStyles from '../../../enum/iconStyles';
import InfiniteScrolling from '../../../component/InfiniteScrolling';

interface IProps {
  selected: boolean;
}

export default function PastTab(props: IProps) {
  const { selected } = props;

  const { list: comments } = useAppSelector(selectPastCommentList);

  return (
    <TabContent selected={selected}>
      <InfiniteScrolling
        loadAsyncThunk={loadPastCommentList}
        selectState={selectPastCommentList}
        resetAction={resetPastComments()}
      >
        {comments?.length ? (
          <Comments comments={comments} />
        ) : (
          <Icon icon={iconStyles.noActivity} width="4em" height="4em" />
        )}
      </InfiniteScrolling>
    </TabContent>
  );
}
