import classNames from 'classnames/bind';
import style from './PlayList.module.scss';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { LogoViewTable } from '../../../../assets/svg/LogoViewTable';
import { LogoViewCard } from '../../../../assets/svg/LogoViewCard';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { formatDuration } from '../../../../constant';
import { CustomizeTable } from '../../../../components/CustomizeTable/CustomizeTable';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { LogoAddPlaylist } from '../../../../assets/svg/LogoAddPlaylist';
import { PlayListType } from '../../../../types/PlayList';
import { playListAPI } from '../../../../api/playList';
import { routesConfig } from '../../../../routes/routeConfig';
import { Link, useNavigate } from 'react-router-dom';
import { CardPlayList } from '../../../../components/CardRecord/CardRecord';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../../redux/Slice/Sidebar';
const cx = classNames.bind(style);

const PlayList = () => {
      const dispatch = useDispatch<any>();
      const dataRef = useRef<PlayListType[] | []>([]);
      const [dataSource, setDataSource] = useState<PlayListType[] | []>([]);
      const navigate = useNavigate();
      const [viewType, setViewType] = useState<boolean>(true);

      const columns = [
            {
                  title: 'STT',
                  dataIndex: 'STT',
                  render: (id: any, record: any, index: number) => {
                        ++index;
                        return <p style={{ textAlign: 'right' }}>{index}</p>;
                  },
            },
            {
                  title: 'Tiêu đề',
                  dataIndex: 'name',
            },
            {
                  width: '7%',
                  title: 'Số bản ghi',
                  dataIndex: 'quantityRecord',
                  render: (quantity: number) => {
                        return <p style={{ textAlign: 'right' }}>{quantity}</p>;
                  },
            },
            {
                  width: '8%',
                  title: 'Thời lượng',
                  dataIndex: 'duration',
                  render: (seconds: number) => {
                        return <p style={{ textAlign: 'right' }}>{formatDuration(seconds)}</p>;
                  },
            },
            {
                  width: '24%',
                  title: 'Chủ đề',
                  dataIndex: 'titles',
                  render: (data: string[]) => {
                        return data.map((title, index) => (
                              <span
                                    style={{
                                          fontSize: '12px',
                                          border: '1px solid #F5F5FF90',
                                          borderRadius: '6px',
                                          padding: '6px 12px',
                                          marginRight: '8px',
                                          color: '#F5F5FF85',
                                    }}
                                    key={index}
                              >
                                    {title}
                              </span>
                        ));
                  },
            },
            {
                  title: 'Ngày tạo',
                  dataIndex: 'createAt',
                  render: (date: string) => {
                        return <span> {dayjs(date).format('DD/MM/YYYY')}</span>;
                  },
            },
            {
                  title: 'Người tạo',
                  dataIndex: 'creator',
            },
            {
                  title: '',
                  dataIndex: 'detailsAction',
                  render: (data: PlayListType) => {
                        return (
                              <>
                                    <Link
                                          state={{ ...data }}
                                          className="text-underline"
                                          to={`${routesConfig.updateRecord.replace(':id', data.key)}`}
                                    >
                                          Chi tiết
                                    </Link>
                              </>
                        );
                  },
            },
      ];

      function renderData(data: PlayListType[]) {
            var arr = data.map((item: PlayListType) => {
                  return {
                        ...item,
                        key: item.key,
                        detailsAction: item,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }

      useEffect(() => {
            renderData(playListAPI);
            dispatch(toggleSidebar({ type: 'block', isOpen: false }));
      }, []);

      return (
            <div>
                  <HeaderContent title={'PlayList'} />
                  <div style={{ display: 'flex', width: 'var(--width-content-sidebar-open' }}>
                        <input type="text" className={cx('search')} placeholder="Tên chủ đề, người tạo..." />
                        <div className={cx('view')}>
                              <div
                                    className={cx('logoViewTable', viewType && 'active')}
                                    onClick={() => setViewType(true)}
                              >
                                    <LogoViewTable />
                              </div>
                              <div
                                    className={cx('logoViewCard', !viewType && 'active')}
                                    onClick={() => setViewType(false)}
                              >
                                    <LogoViewCard />
                              </div>
                        </div>
                  </div>
                  <div className={cx('content')}>
                        <div style={{ width: 'var(--width-content-sidebar-open)' }}>
                              {viewType ? (
                                    <div className={cx('table')}>
                                          <CustomizeTable
                                                columns={columns}
                                                dataSource={dataSource}
                                                pageSize={10}
                                                
                                          />
                                    </div>
                              ) : (
                                    <div className={cx('listCardPlayList')}>
                                          {dataSource.map((item, index) => {
                                                return <CardPlayList playList={item} key={index} />;
                                          })}
                                    </div>
                              )}
                        </div>
                        <div>
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          logo: <LogoAddPlaylist />,
                                          title: 'Thêm Playlist',
                                          type: 'button',
                                          onClick: () => navigate(routesConfig.addPlayList),
                                    }}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default PlayList;
