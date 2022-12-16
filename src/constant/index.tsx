import * as duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
export const formatDuration = (seconds: number): string => {
      dayjs.extend(duration);
      const dayJSduration = dayjs.duration(seconds, 'second');
      return seconds > 3600 ? dayJSduration.format('HH:mm:ss') : dayJSduration.format('mm:ss');
};
export const renderTextFromTime = (timeStamp: number) => {
      const currentDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            23,
            59,
            59,
      ).getTime();

      if (currentDate < timeStamp) {
            return (
                  <p>
                        <span style={{ color: 'var(--color-blue)' }}>&#9679; &nbsp;</span>
                        Còn thời hạn
                  </p>
            );
      } else {
            return (
                  <p>
                        <span style={{ color: 'var(--color-gray)' }}>&#9679; &nbsp;</span>
                        Hết thời hạn
                  </p>
            );
      }
};
