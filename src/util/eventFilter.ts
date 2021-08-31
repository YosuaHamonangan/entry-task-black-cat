import { DateFilter } from '../enum/eventFilter';
import { IFilterState } from '../interfaces/state';

export function getFilterDateRange(filter: IFilterState): { from: Date; to: Date } | null {
  let from = new Date();
  from.setHours(0, 0, 0, 0);

  let to = new Date();
  to.setHours(0, 0, 0, 0);

  switch (filter.date) {
    case DateFilter.today:
      to.setDate(to.getDate() + 1);
      break;
    case DateFilter.tomorrow:
      from.setDate(from.getDate() + 1);
      to.setDate(to.getDate() + 2);
      break;
    case DateFilter.thisWeek:
      from.setDate(from.getDate() - from.getDay() + 1);
      to.setDate(to.getDate() + 7);
      break;
    case DateFilter.thisMonth:
      from.setDate(1);
      to.setMonth(to.getMonth() + 1);
      to.setDate(0);
      break;
    case DateFilter.later:
      from = new Date(filter.from!);
      to = new Date(filter.to!);
      to.setDate(to.getDate() + 1);
      break;
    default:
      return null;
  }
  return { from, to };
}

export function validateFilter(filter: IFilterState): boolean {
  if (filter.date === null) return false;
  if (filter.date === DateFilter.later) {
    if (!filter.from) return false;
    if (!filter.to) return false;
  }
  if (filter.channels === null) return false;

  return true;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
};
export function getFilterSummary(filter: IFilterState): string {
  if (!filter.isValid) return '';
  const channelsStr =
    filter.channels! === 'all'
      ? 'all channel'
      : filter.channels!.map(({ name }) => name).join(', ');
  let dateStr = '';

  if (filter.date === DateFilter.anytime) {
    dateStr = 'on anytime';
  } else {
    let from = '';
    let to = '';
    const range = getFilterDateRange(filter);
    if (range) {
      from = range.from.toLocaleDateString('en-GB', dateOptions).replace(',', '');

      range.to.setDate(range.to.getDate() - 1);
      to = range.to.toLocaleDateString('en-GB', dateOptions).replace(',', '');
    }
    dateStr = from === to ? `on ${from}` : `from ${from} to ${to}`;
  }
  return `${channelsStr} Activities ${dateStr}`;
}
