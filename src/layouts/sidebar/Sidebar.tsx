import classNames from 'classnames/bind';
import { useState } from 'react';
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
import { routesConfig } from '../../routes/routeConfig';
import style from './Sidebar.module.scss';
const cx = classNames.bind(style);

export const Sidebar = () => {
      const navbarList = [
            {
                  title: 'Kho bản ghi',
                  logo: <LogoRecordStore className={cx('fill')} />,
                  to: routesConfig.recordStore,
            },
            {
                  title: 'Playlist',
                  logo: <LogoPlayList className={cx('fill')} />,
                  to: routesConfig.playList,
            },
            {
                  title: 'Lập lịch phát',
                  logo: <LogoCalendar className={cx('fill')} />,
                  to: routesConfig.playScheduling,
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
                  title: 'Doanh thu',
                  logo: <LogoRevenue className={cx('stroke')} />,
                  to: routesConfig.revenue,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: 'Báo cáo doanh thu',
                              to: routesConfig.revenue,
                              navigateTo: routesConfig.revenue,
                        },
                        {
                              title: 'Lịch sử đối soát',
                              to: routesConfig.revenue,
                              navigateTo: routesConfig.revenue,
                        },
                        {
                              title: 'Phân phối doanh thu',
                              to: routesConfig.revenue,
                              navigateTo: routesConfig.revenue,
                        },
                  ],
            },
            {
                  title: 'Cài đặt',
                  logo: <LogoSettings className={cx('stroke')} />,
                  to: routesConfig.settings,
                  logoRight: <LogoThreeDotVertical />,
                  subMenu: [
                        {
                              title: 'Phân quyền người dùng',
                              to: routesConfig.settings,
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Cấu hình',
                              to: routesConfig.settings,
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Quản lý hợp đồng',
                              to: routesConfig.settings,
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Thông tin tác phẩm',
                              to: routesConfig.settings,
                              navigateTo: routesConfig.settings,
                        },
                        {
                              title: 'Chu kỳ đối soát',
                              to: routesConfig.settings,
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
                              to: routesConfig.support,
                              navigateTo: routesConfig.support,
                        },
                        {
                              title: 'Tải app',
                              to: routesConfig.support,
                              navigateTo: routesConfig.support,
                        },
                        {
                              title: 'Feedback',
                              to: routesConfig.support,
                              navigateTo: routesConfig.support,
                        },
                  ],
            },
      ];
      const location = useLocation();
      const path = location.pathname.toString();
      const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
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
            <div className={cx('wrapper_Sidebar', closeSidebar && 'close')}>
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
                              onClick={() => setCloseSidebar(true)}
                        />
                  </div>
                  <p onClick={() => setCloseSidebar(false)} className={cx('openSidebar', closeSidebar && 'show')}>
                        {<LogoArrowRight />}
                  </p>
            </div>
      );
};
