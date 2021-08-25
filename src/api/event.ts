import { IEventData } from '../interfaces/event';
import { IReqGetEvents } from '../interfaces/req';
import faker from 'faker';

faker.seed(123);
const channels: string[] = [];
for (let i = 0; i < 3; i++) {
  channels.push(faker.company.companyName().slice(0, 20));
}

const dummyData: IEventData[] = [];
const titles = ['Today Event', 'Tomorow Event', 'Next Week Event'];
const deltaStart = [0, 1, 7];
for (let i = 0; i < 10; i++) {
  let title = titles[i];

  let start = faker.date.future(0);
  if (deltaStart[i] !== undefined) {
    start = new Date();
    start.setDate(start.getDate() + deltaStart[i]);
  }

  dummyData.push({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    channel: channels[faker.datatype.number(channels.length - 1)],
    title: title || faker.lorem.sentence(),
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

  if (filter) {
    const minDate = filter.from ? new Date(filter.from) : null;
    const maxDate = filter.to ? new Date(filter.to) : null;

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
