import { IEventData } from '../interfaces/event';
import { IReqGetEvents } from '../interfaces/req';
import faker from 'faker';
import { getFilterDateRange } from '../util/dateFilter';

faker.seed(123);
const channels: string[] = [];
for (let i = 0; i < 3; i++) {
  channels.push(faker.company.companyName().slice(0, 20));
}
const dummyData: IEventData[] = [
  {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    channel: channels[faker.datatype.number(channels.length - 1)],
    title: 'Test Data',
    start: 'Wed Aug 21 2021 15:00:00 GMT+0700 (Western Indonesia Time)',
    end: 'Wed Aug 22 2022 18:00:00 GMT+0700 (Western Indonesia Time)',
    description: faker.lorem.paragraphs(),
    going: faker.datatype.number(),
    is_going: faker.datatype.boolean(),
    likes: faker.datatype.number(),
    is_liked: faker.datatype.boolean(),
  },
];

for (let i = 0; i < 10; i++) {
  const start = faker.date.future(0);
  dummyData.push({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    channel: channels[faker.datatype.number(channels.length - 1)],
    title: faker.lorem.sentence(),
    start: start.toString(),
    end: faker.date.future(0, start).toString(),
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

  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  if (filter?.date) {
    const range = getFilterDateRange(filter.date);
    if (range) {
      minDate = range.min;
      maxDate = range.max;
    }
  }

  if (filter) {
    data = data.filter((event) => {
      let shown = true;

      if (minDate && maxDate) {
        const startDate = new Date(event.start);
        shown = shown && startDate >= minDate && startDate <= maxDate;
      }

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
