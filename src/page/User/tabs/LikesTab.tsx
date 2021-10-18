import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import TabContent from '../../../component/TabContent';
import {
  loadUserLikesList,
  selectUserLikesList,
  resetUserLikes,
} from '../../../reducer/userLikesList';
import EventList from '../../../component/EventList';
import InfiniteScrolling from '../../../component/InfiniteScrolling';

interface IProps {
  selected: boolean;
}

export default function LikesTab(props: IProps) {
  const { selected } = props;

  const { list: events } = useAppSelector(selectUserLikesList);

  return (
    <TabContent selected={selected}>
      <InfiniteScrolling
        loadAsyncThunk={loadUserLikesList}
        selectState={selectUserLikesList}
        resetAction={resetUserLikes()}
      >
        <EventList events={events} />
      </InfiniteScrolling>
    </TabContent>
  );
}
