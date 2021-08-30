import { ICommentData } from '../interfaces/res';
import { dummyCommentData } from './dummyDb';

export async function getEventComment(eventId: string): Promise<ICommentData[]> {
  const res: ICommentData[] = dummyCommentData.filter((comment) => comment.event.id === eventId);
  return res;
}
