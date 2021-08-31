export function getFullDateString(date: string | Date) {
  return new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTimeString(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function getDateTimeString(date: string | Date) {
  return new Date(date)
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');
}

export function getTimeDiffString(date: string | Date) {
  const targetDate = new Date(date);
  const targetTime = targetDate.getTime();
  const currentTime = new Date().getTime();

  const diffSecond = Math.floor((currentTime - targetTime) / 1000);
  if (diffSecond < 60) return `${diffSecond} second ago`;

  const diffMinute = Math.floor(diffSecond / 60);
  if (diffMinute < 60) return `${diffMinute} minute ago`;

  const diffHour = Math.floor(diffMinute / 60);
  if (diffHour < 60) return `${diffHour} hour ago`;

  const diffDay = Math.floor(diffMinute / 24);
  if (diffDay < 7) return `${diffHour} day ago`;

  return targetDate.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
