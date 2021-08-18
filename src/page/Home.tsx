import React from 'react';
import Header from '../component/Header';
import Content from '../component/Content';
import EventCard from '../component/EventCard';
import { IEventData } from '../interfaces/event';

const dummyData: IEventData[] = [
  {
    username: 'username',
    channel: 'channel',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    isGoing: true,
    isLiked: true,
  },
  {
    username: 'username 2',
    channel: 'Channel name longer',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    going: 6,
    likes: 10,
  },
  {
    username: 'username',
    channel: 'channel',
    title: 'Activity Title Name Make it Longer May Longer than One Line',
    start: new Date(),
    end: new Date(),
    description:
      '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...',
    isGoing: true,
    isLiked: true,
  },
];

export default function Home() {
  const data = dummyData;
  return (
    <div>
      <Header />
      <Content>
        {data.map((data, i) => (
          <EventCard key={i} data={data} />
        ))}
      </Content>
    </div>
  );
}
