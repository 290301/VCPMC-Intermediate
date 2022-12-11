import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';
import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);

type ComponentProps = {
      component: ReactNode;
};

export const DefaultLayout = ({ component }: ComponentProps) => {
      return (
            <div className={cx('wrapper')}>
                  <div className={cx('sidebar')}>
                        <Sidebar />
                  </div>
                  <div className={cx('content')}>
                        <Header />
                        <div className={cx('children')}>{component}</div>
                  </div>
            </div>
      );
};
