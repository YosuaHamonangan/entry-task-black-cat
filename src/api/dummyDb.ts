import {
  IEventData,
  ICommentData,
  IUserData,
  IChannelData,
  ILikeData,
  IGoingData,
} from '../interfaces/data';

import faker from 'faker';

faker.seed(1);
export const dummyUsers: IUserData[] = [];
for (let i = 0; i < 20; i++) {
  dummyUsers.push({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: `user${i}@email.com`,
    password: '123456',
    picture: faker.image.avatar(),
  });
}

export const dummyChannels: IChannelData[] = [];
for (let i = 0; i < 3; i++) {
  dummyChannels.push({
    id: faker.datatype.uuid(),
    name: faker.company.companyName().slice(0, 20),
  });
}

export const dummyEvents: IEventData[] = [];
const titles = ['Today Event', 'Tomorow Event', 'Next Week Event'];
const deltaStart = [0, 1, 7];
for (let i = 0; i < 20; i++) {
  let title = titles[i];

  let start = faker.date.future(0);
  if (deltaStart[i] !== undefined) {
    start = new Date();
    start.setDate(start.getDate() + deltaStart[i]);
  }

  dummyEvents.push({
    id: faker.datatype.uuid(),
    user: dummyUsers[faker.datatype.number(dummyUsers.length - 1)],
    channel: dummyChannels[faker.datatype.number(dummyChannels.length - 1)],
    title: title || faker.lorem.sentence(),
    start: start.toString(),
    end: faker.date.future(0, start).toString(),
    description: faker.lorem.paragraphs(),
    published: faker.date.recent().toString(),
    location: faker.address.secondaryAddress(),
    address: `${faker.address.streetAddress()}, ${faker.address.countryCode()}`,
    coordinate: '/image/gmap.png',
  });
}

export const dummyCommentData: ICommentData[] = [];
dummyEvents.forEach((event) => {
  for (let i = 0; i < 10; i++) {
    dummyCommentData.push({
      user: dummyUsers[faker.datatype.number(dummyUsers.length - 1)],
      event,
      comment: faker.lorem.sentences(),
      time: faker.date.recent().toString(),
      target: null,
    });
  }
});

export const dummyLikeData: ILikeData[] = [];
dummyEvents.forEach((event) => {
  const users: IUserData[] = [];
  for (let i = 0; i < faker.datatype.number(dummyUsers.length - 1); i++) {
    const user = dummyUsers[faker.datatype.number(dummyUsers.length - 1)];
    if (!users.includes(user)) users.push(user);
  }

  users.forEach((user) => dummyLikeData.push({ user, event }));
});

export const dummyGoingData: IGoingData[] = [];
dummyEvents.forEach((event) => {
  const users: IUserData[] = [];
  for (let i = 0; i < faker.datatype.number(dummyUsers.length - 1); i++) {
    const user = dummyUsers[faker.datatype.number(dummyUsers.length - 1)];
    if (!users.includes(user)) users.push(user);
  }

  users.forEach((user) => dummyGoingData.push({ user, event }));
});
