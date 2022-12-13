import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { LogoAdminister } from '../../assets/svg/LogoAdminister';
import { LogoApp } from '../../assets/svg/LogoApp';
import { LogoArrowRight } from '../../assets/svg/LogoArrowRight';
import { LogoCalendar } from '../../assets/svg/LogoCalendar';
import { LogoPlayList } from '../../assets/svg/LogoPlayList';
import { LogoRecordStore } from '../../assets/svg/LogoRecordStore';
import { LogoRevenue } from '../../assets/svg/LogoRevenue';
import { LogoSettings } from '../../assets/svg/LogoSettings';
import { LogoSupport } from '../../assets/svg/LogoSupport';
import { LogoThreeDotVertical } from '../../assets/svg/LogoThreeDotVertical';
import CustomizeButton from '../../components/CustomizeButton/CustomizeButton';
import { toggleSidebar } from '../../redux/Slice/Sidebar';
import { RootState } from '../../redux/store';
import { routesConfig } from '../../routes/routeConfig';
import { translate } from '../../translate';
import style from './Sidebar.module.scss';
const cx = classNames.bind(style);

export const Sidebar = () => {
      const navbarList = [
            {
                  title: translate.recordStore,
                  to: routesConfig.recordStore,
                  logo: <LogoRecordStore className={cx('fill')} />,
            },
            {
                  title: translate.playList,
                  to: routesConfig.playList,
                  logo: <LogoPlayList className={cx('fill')} />,
            },
            {
                  title: translate.playScheduling,
                  to: routesConfig.playScheduling,
                  logo: <LogoCalendar className={cx('fill')} />,
            },
            {
                  title: 'Quản lý',
                  logo: <LogoAdminister className={cx('fill')} />,
                  to: routesConfig.administer,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: 'Quản lý hợp đồng',
                              navigateTo: routesConfig.contractManagement,
                        },
                        {
                              title: 'Quản lý thiết bị',
                              navigateTo: routesConfig.deviceManagement,
                        },
                        {
                              title: 'Đơn vị ủy quyền',
                              navigateTo: routesConfig.authorizedEntities,
                        },
                  ],
            },
            {
                  title: translate.revenue,
                  to: routesConfig.revenue,
                  logo: <LogoRevenue className={cx('stroke')} />,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: translate.revenueReport,
                              navigateTo: routesConfig.revenueReport,
                        },
                        {
                              title: translate.history,
                              navigateTo: routesConfig.history,
                        },
                        {
                              title: translate.revenueDistribution,
                              navigateTo: routesConfig.revenueDistribution,
                        },
                  ],
            },
            {
                  title: translate.settings,
                  to: routesConfig.settings,
                  logo: <LogoSettings className={cx('stroke')} />,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: 'Phân quyền người dùng',
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Cấu hình',
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Quản lý hợp đồng',
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Thông tin tác phẩm',
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Chu kỳ đối soát',
                              navigateTo: routesConfig.settings,
                        },
                  ],
            },
            {
                  title: 'Hỗ trợ',
                  logo: <LogoSupport className={cx('fill')} />,
                  to: routesConfig.support,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: 'Hướng dẫn sử dụng',
                              navigateTo: routesConfig.support,
                        },
                        {
                              title: 'Tải app',
                              navigateTo: routesConfig.support,
                        },
                        {
                              title: 'Feedback',
                              navigateTo: routesConfig.support,
                        },
                  ],
            },
      ];
      const location = useLocation();
      const statusSidebar = useSelector((state: RootState) => state.sidebar.isOpen);
      const dispatch = useDispatch<any>();
      const path = location.pathname.toString();
      const handleClickNavLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (
                  event.currentTarget.parentElement?.className.includes('disable') ||
                  event.currentTarget.className.includes(cx('subItemActive'))
            ) {
                  event.preventDefault();
                  event.stopPropagation();
            }
      };

      return (
            <div className={cx('wrapper_Sidebar', !statusSidebar && 'hide')}>
                  <LogoApp className={cx('LogoApp')} style={{}} />
                  <div className={cx('navbar_list')}>
                        {navbarList.map((item, index) => {
                              return (
                                    <div
                                          key={index}
                                          className={cx(
                                                'navbar-item',
                                                path.startsWith(item.to) && 'active',
                                                item.subMenu && 'disable',
                                          )}
                                    >
                                          <NavLink to={item.to} onClick={handleClickNavLink} className={cx('item')} end>
                                                <div className={cx('rectangleActive')}></div>
                                                <div>
                                                      {item.logo}
                                                      <p className={cx('title')}>{item.title}</p>
                                                </div>
                                          </NavLink>
                                          {item.subMenu && (
                                                <>
                                                      <div className={cx('logoRight')}>{item.logoRight}</div>
                                                      <div className={cx('sub-menu')}>
                                                            {item.subMenu.map((subItem, index) => {
                                                                  return (
                                                                        <NavLink
                                                                              key={index}
                                                                              state={{ navigateTo: subItem.navigateTo }}
                                                                              to={{ pathname: item.to }}
                                                                              className={cx(
                                                                                    'sub-menu-item',
                                                                                    path.endsWith(subItem.navigateTo) &&
                                                                                          'subItemActive',
                                                                              )}
                                                                              end
                                                                        >
                                                                              <p className={cx('sub-menu-title')}>
                                                                                    {subItem.title}
                                                                              </p>
                                                                        </NavLink>
                                                                  );
                                                            })}
                                                      </div>
                                                </>
                                          )}
                                    </div>
                              );
                        })}
                        <CustomizeButton
                              title="Close "
                              type="button"
                              typeUI="primary"
                              onClick={() => dispatch(toggleSidebar(false))}
                        />
                  </div>
                  <p
                        onClick={() => dispatch(toggleSidebar(true))}
                        className={cx('openSidebar', statusSidebar && 'hide')}
                  >
                        {<LogoArrowRight />}
                  </p>
            </div>
      );
};
