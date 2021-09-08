import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import TabContent from '../../../component/TabContent';
import { selectCurrentUser } from '../../../reducer/user';
import { loadUserLikes, selectUserLikes } from '../../../reducer/event';
import EventList from '../../../component/EventList';

interface IProps {
  selected: boolean;
}

export default function LikesTab(props: IProps) {
  const { selected } = props;

  const dispatch = useAppDispatch();
  // Todo change event loader
  const events = useAppSelector(selectUserLikes);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) return;

    dispatch(loadUserLikes(user.id));
  }, [dispatch, user]);

  return (
    <TabContent selected={selected}>
      <EventList events={events} />
    </TabContent>
  );
}
