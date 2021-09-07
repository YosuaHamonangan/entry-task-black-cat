import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import EventCard from '../../../component/EventCard';
import TabContent from '../../../component/TabContent';
import { selectCurrentUser, loadUserLikes, selectUserLikes } from '../../../reducer/user';

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
      {events && events.map((data, i) => <EventCard key={i} data={data} />)}
    </TabContent>
  );
}
