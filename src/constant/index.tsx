import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const isOpenSidebar = () => {
      const status = useSelector((state: RootState) => state.sidebar.isOpen);
      return status;
};
