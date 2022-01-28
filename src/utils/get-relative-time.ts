import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);

export const getRelativeTime = (timestamp: number) =>
  dayjs().locale('ru').to(dayjs(timestamp));