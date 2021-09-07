import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import EventCard from '../../../component/EventCard';
import TabContent from '../../../component/TabContent';
import { selectCurrentUser, loadUserGoing, selectUserGoing } from '../../../reducer/user';

interface IProps {
  selected: boolean;
}

export default function GoingTab(props: IProps) {
  const { selected } = props;

  const dispatch = useAppDispatch();
  // Todo change event loader
  const events = useAppSelector(selectUserGoing);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) return;

    dispatch(loadUserGoing(user.id));
  }, [dispatch, user]);

  return (
    <TabContent selected={selected}>
      {events && events.map((data, i) => <EventCard key={i} data={data} />)}
    </TabContent>
  );
}
