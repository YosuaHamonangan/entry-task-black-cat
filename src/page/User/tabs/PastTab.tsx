import React, { useEffect } from 'react';
import TabContent from '../../../component/TabContent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../reducer/user';
import { selectPastComments, loadPastComments, resetPastComments } from '../../../reducer/event';
import Comments from '../../../component/Comments';
import Icon from '../../../component/Icon';
import iconStyles from '../../../enum/iconStyles';
import InfiniteScrolling from '../../../component/InfiniteScrolling';
import { ICommentData } from '../../../interfaces/data';

interface IProps {
  selected: boolean;
}

export default function PastTab(props: IProps) {
  const { selected } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const comments = useAppSelector(selectPastComments);

  useEffect(() => {
    dispatch(resetPastComments());
  }, [dispatch]);

  async function getNext(nextIdx: number) {
    const action = await dispatch(loadPastComments({ userId: user!.id, startIdx: nextIdx }));
    const comments = action.payload as ICommentData[];
    return comments;
  }

  return (
    <TabContent selected={selected}>
      <InfiniteScrolling next={getNext}>
        {comments?.length ? (
          <Comments comments={comments} />
        ) : (
          <Icon icon={iconStyles.noActivity} width="4em" height="4em" />
        )}
      </InfiniteScrolling>
    </TabContent>
  );
}
