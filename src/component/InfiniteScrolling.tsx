import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function InfiniteScrolling<ResponseInterface>(props: {
  // eslint-disable-next-line no-unused-vars
  next: (nextIdx: number) => Promise<ResponseInterface[]>;
  numDataLoad?: number;
  children: any;
}) {
  const { next, children } = props;
  const [data, setData] = useState<ResponseInterface[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextIdx, setNextIdx] = useState(0);

  async function getNextData() {
    try {
      const newData = await next(nextIdx);
      if (newData.length) {
        const nextData = data.concat(newData);
        setData(nextData);
        setNextIdx(nextData.length);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNextData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
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
