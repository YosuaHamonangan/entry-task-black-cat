import React, { useEffect } from 'react';
import TabContent from '../../../component/TabContent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../reducer/user';
import { selectPastComments, loadPastComments } from '../../../reducer/event';
import Comments from '../../../component/Comments';
import Icon from '../../../component/Icon';
import iconStyles from '../../../enum/iconStyles';

interface IProps {
  selected: boolean;
}

export default function PastTab(props: IProps) {
  const { selected } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const comments = useAppSelector(selectPastComments);

  useEffect(() => {
    if (!user) return;
    dispatch(loadPastComments(user.id));
  }, [dispatch, user]);

  return (
    <TabContent selected={selected}>
      {comments?.length ? (
        <Comments comments={comments} />
      ) : (
        <Icon icon={iconStyles.noActivity} width="4em" height="4em" />
      )}
    </TabContent>
  );
}
