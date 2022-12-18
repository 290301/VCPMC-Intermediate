import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';
import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);

type ComponentProps = {
      component: ReactNode;
};

export const DefaultLayout = ({ component }: ComponentProps) => {
      const statusSidebar = useSelector((state: RootState) => state.sidebar.type);
      return (
            <div className={cx('wrapper')}>
                  <Sidebar />
                  <div className={cx('content', statusSidebar === 'block' ? 'sb-block' : 'sb-fixed')}>
                        <Header />
                        <div className={cx('children')}>{component}</div>
                  </div>
            </div>
      );
};
