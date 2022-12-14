import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const isOpenSidebar = () => {
      const status = useSelector((state: RootState) => state.sidebar.isOpen);
      return status;
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
      return <></>;
};
