import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import TabContent from '../../../component/TabContent';
import {
  loadUserGoingList,
  selectUserGoingList,
  resetUserGoing,
} from '../../../reducer/userGoingList';
import EventList from '../../../component/EventList';
import InfiniteScrolling from '../../../component/InfiniteScrolling';

interface IProps {
  selected: boolean;
}

export default function GoingTab(props: IProps) {
  const { selected } = props;

  const { list: events } = useAppSelector(selectUserGoingList);

  return (
    <TabContent selected={selected}>
      <InfiniteScrolling
        loadAsyncThunk={loadUserGoingList}
        selectState={selectUserGoingList}
        resetAction={resetUserGoing()}
      >
        <EventList events={events} />
      </InfiniteScrolling>
    </TabContent>
  );
}
