import { AsyncThunk, Action } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState, store } from '../app/store';
import { IInfiniteListState } from '../interfaces/state';

export default function InfiniteScrolling(props: {
  loadAsyncThunk: AsyncThunk<any, void, {}>;
  // eslint-disable-next-line no-unused-vars
  selectState: (state: RootState) => IInfiniteListState;
  resetAction: Action;
  children: any;
}) {
  const { loadAsyncThunk, selectState, resetAction, children } = props;

  const dispatch = useAppDispatch();
  const state = useAppSelector(selectState);
  const { list, hasMore } = state;

  async function getNextData() {
    const { isLoading } = selectState(store.getState());
    if (!isLoading) await dispatch(loadAsyncThunk());
  }

  useEffect(() => {
    dispatch(resetAction);
    getNextData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={getNextData}
      hasMore={hasMore}
      loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
      endMessage={<h4 style={{ textAlign: 'center' }}>Yay! You have seen it all</h4>}
      scrollableTarget="main"
    >
      {children}
    </InfiniteScroll>
  );
}
