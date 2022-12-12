import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { LogoArrowRight } from '../../assets/svg/LogoArrowRight';
import OptionLanguages from '../../components/OptionLanguages/OptionLanguages';
import { RootState } from '../../redux/store';
import { privateRoutes } from '../../routes';
import { routesConfig } from '../../routes/routeConfig';
import style from './Header.module.scss';
const cx = classNames.bind(style);

export const Header = () => {
      const { id } = useParams();
      const user = useSelector((state: RootState) => state.user);
      const dataRole = useSelector((state: RootState) => state.role.data);
      const roleName = dataRole.find((role) => role.roleID === user.currentUser.roleID);
      const location = useLocation();
      const pathName: string = location.pathname.toString();
      const [currentPages, setCurrentPages] = useState<string[] | []>(() => {
            if (window.localStorage.getItem('currentPage')) {
                  return JSON.parse(window.localStorage.getItem('currentPage')!);
            }
            return [routesConfig.recordStore];
      });
      let num: number = currentPages.indexOf(pathName as never);

      useEffect(() => {
            // Xử lý page Header
            const childrenPage = pathName.startsWith(currentPages[0]);
            if (childrenPage) {
                  // Kiểm tra pathName đã tồn tại trong mảng chưa
                  const Exists = currentPages.find((page) => page === pathName);
                  if (!Exists) {
                        setCurrentPages((prev) => [...prev, pathName]);
                        window.localStorage.setItem('currentPage', JSON.stringify([...currentPages, pathName]));
                  } else if (currentPages[num++]) {
                        // Kiểm tra phần tử kế tiếp có tồn tại hay không
                        setCurrentPages((prev) => [...prev.filter((ele: string) => ele !== currentPages[num])]);
                        window.localStorage.setItem(
                              'currentPage',
                              JSON.stringify([...currentPages.filter((ele: string) => ele !== currentPages[num])]),
                        );
                  }
            } else {
                  setCurrentPages([pathName]);
                  window.localStorage.setItem('currentPage', JSON.stringify([pathName]));
            }
            return () => {
                  window.localStorage.removeItem('currentPage');
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pathName]);
      return (
            <>
                  {/* Change Languages and Info user */}
                  <div className={cx('firstRow')}>
                        <div className={cx('optionLanguages')}>
                              <OptionLanguages />
                        </div>
                        <div className={cx('user')}>
                              <div className={cx('img')}>
                                    <img src={user.currentUser.image} />
                              </div>
                              <Link to={routesConfig.infoUser} className={cx('info')}>
                                    <p className={cx('name')}>
                                          {user.currentUser.firstName + ' ' + user.currentUser.lastName}
                                    </p>
                                    <p className={cx('role')}>{roleName?.roleName}</p>
                              </Link>
                        </div>
                  </div>

                  {/* Translate Page header */}
                  <div className={cx('secondRow', 'heading')}>
                        {currentPages.map((page, index) => {
                              return (
                                    <Link className={cx('link', pathName === page && 'active')} key={index} to={page}>
                                          {privateRoutes.map((route) => {
                                                if (route.pageHeader === page?.replace(`/${id}`, ''))
                                                      return (
                                                            <span key={`${route}${Math.random()}`}>
                                                                  <span className={cx('link-arrow')}>
                                                                        {<LogoArrowRight />}
                                                                  </span>
                                                                  <span className={cx('link-title')}>
                                                                        {route.translate}
                                                                  </span>
                                                            </span>
                                                      );
                                                return true;
                                          })}
                                    </Link>
                              );
                        })}
                  </div>
            </>
      );
};
