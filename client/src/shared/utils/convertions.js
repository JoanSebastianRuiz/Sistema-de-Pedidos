import dayjs from '@/lib/dayjs/dayjs';

export const toMinutes = (time = '') => dayjs(time, 'HH:mm').diff(dayjs().startOf('day'), 'minute');
