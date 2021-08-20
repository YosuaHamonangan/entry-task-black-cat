import { IEventData } from '../interfaces/event';
import { IReqGetEvents } from '../interfaces/req';
import faker from 'faker';

faker.seed(123);
const dummyData: IEventData[] = [];
for (let i = 0; i < 10; i++) {
  const start = faker.date.future(0);
  dummyData.push({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    channel: faker.company.companyName().slice(0, 20),
    title: faker.lorem.sentence(),
    start,
    end: faker.date.future(0, start),
    description: faker.lorem.paragraphs(),
    going: faker.datatype.number(),
    is_going: faker.datatype.boolean(),
    likes: faker.datatype.number(),
    is_liked: faker.datatype.boolean(),
  });
}

export async function getEvents(req: IReqGetEvents): Promise<IEventData[]> {
  let data = dummyData;
  const { filter } = req;

  if (filter) {
    data = data.filter((event) => {
      let shown = true;
      if (filter.channels) {
        shown = shown && filter.channels.includes(event.channel);
      }

      return shown;
    });
  }

  return JSON.parse(JSON.stringify(data));
}

export async function getChannels(): Promise<string[]> {
  const map = new Map<string, boolean>();
  dummyData.forEach(({ channel }) => map.set(channel, true));
  return Array.from(map.keys());
}
