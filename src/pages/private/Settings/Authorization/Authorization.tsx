import classNames from 'classnames/bind';
import style from './Authorization.module.scss';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { useEffect, useRef, useState } from 'react';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { LogoAddUser } from '../../../../assets/svg/LogoAddUser';
import { LogoAddRole } from '../../../../assets/svg/LogoAddRole';
import { useDispatch, useSelector } from 'react-redux';
import { getDataUsers } from '../../../../redux/Slice/User';
import { RootState } from '../../../../redux/store';
import { UserType } from '../../../../types/User';
import { CustomizeTable } from '../../../../components/CustomizeTable/CustomizeTable';
import { Switch } from 'antd';
import dayjs from 'dayjs';
import { RoleType } from '../../../../types/Role';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import { toggleSidebar } from '../../../../redux/Slice/Sidebar';
const cx = classNames.bind(style);
const Authorization = () => {
      const [typeTab, setTypeTab] = useState<'users' | 'roles'>('users');
      const [searchValue, setSearchValue] = useState<string>('');
      const dispatch = useDispatch<any>();
      const navigate = useNavigate();
      useEffect(() => {
            dispatch(toggleSidebar({ type: 'block', isOpen: true }));
      }, []);
      return (
            <>
                  <HeaderContent title="Danh sách người dùng" />
                  <div
                        style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginTop: '10px',
                        }}
                  >
                        <div className={cx('wrapper-authorization')}>
                              <div className={cx('header-1')}>
                                    <div className={cx('switch-tabs')}>
                                          <button
                                                onClick={() => {
                                                      setSearchValue('');
                                                      setTypeTab('users');
                                                }}
                                                className={cx('tab', typeTab === 'users' ? 'active' : '')}
                                          >
                                                Danh sách người dùng
                                          </button>
                                          <button
                                                onClick={() => {
                                                      setTypeTab('roles');
                                                      setSearchValue('');
                                                }}
                                                className={cx('tab', typeTab === 'roles' ? 'active' : '')}
                                          >
                                                Vai trò người dùng
                                          </button>
                                    </div>
                                    <div className={cx('search')}>
                                          <input
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                type="text"
                                                placeholder="Nhập tên người dùng"
                                          />
                                    </div>
                              </div>

                              {typeTab === 'users' ? (
                                    <div className={cx('table', 'tableUsers')}>
                                          <TableUsers search={searchValue} />
                                    </div>
                              ) : (
                                    <div className={cx('table', 'tableRoles')}>
                                          <TableRoles search={searchValue} />
                                    </div>
                              )}
                        </div>
                        {typeTab === 'users' ? (
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          logo: <LogoAddUser />,
                                          title: 'Thêm người dùng',
                                          type: 'button',
                                          onClick: () => navigate(routesConfig.addUser),
                                    }}
                              />
                        ) : (
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          logo: <LogoAddRole />,
                                          title: 'Thêm vai trò',
                                          type: 'button',
                                          onClick: () => alert('Role'),
                                    }}
                              />
                        )}
                  </div>
            </>
      );
};

const TableUsers = ({ search }: { search: string }) => {
      const dispatch = useDispatch<any>();
      const dataUser = useSelector((state: RootState) => state.user.data);
      const dataRole = useSelector((state: RootState) => state.role.data);
      const dataRef = useRef<UserType[] | []>();
      const [dataSource, setDataSource] = useState<UserType[] | []>([]);
      const columns = [
            {
                  width: '5%',
                  title: 'STT',
                  dataIndex: 'STT',
                  render: (id: any, record: any, index: number) => {
                        ++index;
                        return <p style={{ textAlign: 'right' }}>{index}</p>;
                  },
            },
            {
                  title: 'Họ tên',
                  dataIndex: 'fullName',
                  render: (text: any, user: UserType) => {
                        // text: undefined
                        return <>{user.lastName + ' ' + user.firstName}</>;
                  },
            },
            {
                  title: 'Tên đăng nhập',
                  dataIndex: 'userName',
            },
            {
                  title: 'Vai trò',
                  dataIndex: 'roleID',
                  render: (data: string) => {
                        const roleName = dataRole.find((role) => role.roleID === data);
                        return <span>{roleName?.roleName}</span>;
                  },
            },
            {
                  title: 'Trạng thái',
                  dataIndex: 'isActive',
                  render: (isActive: boolean) => {
                        return <Switch defaultChecked={isActive} />;
                  },
            },
            {
                  title: 'Email',
                  dataIndex: 'email',
            },
            {
                  title: 'Số điện thoại',
                  dataIndex: 'phone',
            },
            {
                  title: 'Ngày hết hạn',
                  dataIndex: 'expirationDate',
                  render: (date: number) => {
                        return <>{dayjs(date).format('DD/MM/YYYY')}</>;
                  },
            },
            {
                  title: '',
                  dataIndex: 'editAction',
                  render: (userID: string) => {
                        return <span className="text-underline">Chỉnh sửa</span>;
                  },
            },
      ];
      const renderData = async () => {
            await dispatch(getDataUsers());
            var arr = dataUser.map((user: UserType) => {
                  return {
                        ...user,
                        key: user.id,
                        editAction: user.id,
                  };
            });
            setDataSource(arr);
            dataRef.current = arr;
      };
      useEffect(() => {
            renderData();
      }, []);
      useEffect(() => {
            const dataFilter = dataRef.current?.filter(
                  (user) =>
                        user.email.toLowerCase().includes(search.toLowerCase()) ||
                        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                        user.phone.toLowerCase().includes(search.toLowerCase()),
            );
            dataFilter !== undefined && setDataSource(dataFilter);
      }, [search]);
      return <CustomizeTable dataSource={dataSource} columns={columns} pageSize={6} />;
};

const TableRoles = ({ search }: { search: string }) => {
      const dataRole = useSelector((state: RootState) => state.role.data);
      const [dataSource, setDataSource] = useState<RoleType[] | []>([]);
      const dataRef = useRef<RoleType[] | []>();
      const columns = [
            {
                  width: '5%',
                  title: 'STT',
                  dataIndex: 'STT',
                  render: (id: any, record: any, index: number) => {
                        ++index;
                        return <p style={{ textAlign: 'right' }}>{index}</p>;
                  },
            },
            {
                  width: '15%',
                  title: 'Tên nhóm người dùng',
                  dataIndex: 'roleName',
                  render: (roleName: string) => {
                        return <>{roleName}</>;
                  },
            },
            {
                  width: '14%',
                  title: 'Số lượng người dùng',
                  dataIndex: 'quantityUser',
            },
            {
                  width: '10%',
                  title: 'Vai trò',
                  dataIndex: 'function',
            },
            {
                  title: 'Mô tả',
                  dataIndex: 'desc',
            },

            {
                  width: '9%',
                  title: '',
                  dataIndex: 'updateAction',
                  render: (roleID: string) => {
                        return <span className="text-underline">Cập nhật</span>;
                  },
            },
            {
                  width: '9%',
                  title: '',
                  dataIndex: 'delete',
                  render: (roleID: string) => {
                        return <span className="text-underline">Xóa</span>;
                  },
            },
      ];
      const renderData = async () => {
            var arr = dataRole.map((role: RoleType) => {
                  return {
                        ...role,
                        key: role.roleID,
                        updateAction: role.roleID,
                        deleteAction: role.roleID,
                  };
            });
            setDataSource(arr);
            dataRef.current = arr;
      };
      useEffect(() => {
            renderData();
      }, []);
      useEffect(() => {
            const dataFilter = dataRef.current?.filter((role) =>
                  role.roleName.toLowerCase().includes(search.toLowerCase()),
            );
            dataFilter !== undefined && setDataSource(dataFilter);
      }, [search]);
      return <CustomizeTable dataSource={dataSource} columns={columns} pageSize={6} />;
};
export default Authorization;
