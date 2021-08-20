import { DateFilter } from '../enum/eventFilter';

export function getFilterDateRange(filter: DateFilter): { min: Date; max: Date } | null {
  const min = new Date();
  min.setHours(0, 0, 0, 0);

  const max = new Date();
  max.setHours(0, 0, 0, 0);

  switch (filter) {
    case DateFilter.anytime:
      return null;
    case DateFilter.today:
      max.setDate(max.getDate() + 1);
      break;
    case DateFilter.tomorrow:
      min.setDate(min.getDate() + 1);
      max.setDate(max.getDate() + 2);
      break;
    case DateFilter.thisWeek:
      min.setDate(min.getDate() - min.getDay() + 1);
      max.setDate(min.getDate() + 7);
      break;
    case DateFilter.thisMonth:
      min.setDate(1);
      max.setMonth(max.getMonth() + 1);
      max.setDate(0);
      break;
  }
  return { min, max };
}
