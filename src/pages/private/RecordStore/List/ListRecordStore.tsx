import classNames from 'classnames/bind';
import style from './ListRecordStore.module.scss';
import CustomizeSelect from '../../../../components/CustomizeSelect/CustomizeSelect';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { translate } from '../../../../translate';
import { LogoViewTable } from '../../../../assets/svg/LogoViewTable';
import { LogoViewCard } from '../../../../assets/svg/LogoViewCard';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { LogoEditCircle } from '../../../../assets/svg/LogoEdit';
import { isOpenSidebar, renderTextFromTime } from '../../../../constant';
import { CustomizeTable, RowSelection } from '../../../../components/CustomizeTable/CustomizeTable';
import { recordStoreAPI } from '../../../../api/recordStore';
import dayjs from 'dayjs';
import { RecordType } from '../../../../types/RecordStore';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import { CardRecord } from '../../../../components/CardRecord/CardRecord';
import { LogoCheckedCircle } from '../../../../assets/svg/LogoChecked';
import { LogoXmarkCircle } from '../../../../assets/svg/LogoXmarks';
import { YoutubeBox } from '../../../../components/YoutubeBox/YoutubeBox';
const cx = classNames.bind(style);

const ListRecordStore = () => {
      const [dataSource, setDataSource] = useState<RecordType[] | []>([]);
      const [videoYoutube, setVideoYoutube] = useState<string>('');
      const [mountModal, setMountModal] = useState<boolean>(false);
      const [tableRowSelect, setTableRowSelect] = useState<{ isShow: boolean; listSelected: RecordType[] }>({
            isShow: false,
            listSelected: [],
      });
      const dataRef = useRef<RecordType[] | []>([]);
      const [viewType, setViewType] = useState<boolean>(true);
      const listOption = [
            {
                  title: 'Thể loại',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'pop', label: 'Pop' },
                        { value: 'edm', label: 'EDM' },
                        { value: 'ballad', label: 'Ballad' },
                  ],
            },
            {
                  title: 'Định dạng',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'music', label: 'Music' },
                        { value: 'video', label: 'Video' },
                  ],
            },
            {
                  title: 'Thời hạn sử dụng',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'valid', label: 'Còn thời hạn' },
                        { value: 'invalid', label: 'Hết thời hạn' },
                  ],
            },
            {
                  title: 'Trạng thái',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'user', label: 'Duyệt bởi người dùng' },
                        { value: 'automatic', label: 'Duyệt tự động' },
                  ],
            },
      ];
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
                  title: 'Tên bài hát',
                  dataIndex: 'name',
            },
            {
                  title: 'Mã ISRC',
                  dataIndex: 'id_ISRC',
            },
            {
                  title: 'Thời lượng',
                  dataIndex: 'duration',
                  render: (time: string) => {
                        return <p style={{ textAlign: 'right' }}>{time}</p>;
                  },
            },
            {
                  title: 'Ca sĩ',
                  dataIndex: 'singer',
            },
            {
                  title: 'Tác giả',
                  dataIndex: 'author',
            },
            {
                  title: 'Thể loại',
                  dataIndex: 'type',
            },
            {
                  title: 'Định dạng',
                  dataIndex: 'format',
            },
            {
                  title: 'Thời hạn sử dụng',
                  dataIndex: 'timeValid',
                  render: (time: number) => {
                        return (
                              <>
                                    {renderTextFromTime(time)}
                                    <span style={{ color: '#fff', fontSize: '10px' }}>
                                          {dayjs(time).format('DD/MM/YYYY')}
                                    </span>
                              </>
                        );
                  },
            },
            {
                  title: '',
                  dataIndex: 'updateAction',
                  render: (data: RecordType) => {
                        return (
                              <>
                                    <Link
                                          state={{ ...data }}
                                          className="text-underline"
                                          to={`${routesConfig.updateRecord.replace(':id', data.id_ISRC)}`}
                                    >
                                          Cập nhật
                                    </Link>
                              </>
                        );
                  },
            },
            {
                  title: '',
                  dataIndex: 'listenAction',
                  render: (data: string) => {
                        return (
                              <p
                                    onClick={() => {
                                          setMountModal(true);
                                          setVideoYoutube(data);
                                    }}
                                    className="text-underline"
                              >
                                    Nghe
                              </p>
                        );
                  },
            },
      ];

      const onChangeRowSelect = (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => {
            // selectedRowKeys: index of table => start at 0
            // selectedRows: list record seleted
            console.log(selectedRowKeys, selectedRows);
      };
      const rowSelection: RowSelection = {
            isShowRowSelection: tableRowSelect.isShow,
            onChangeRowSelect: onChangeRowSelect,
      };

      function renderData(data: RecordType[]) {
            var arr = data.map((record: RecordType, index) => {
                  return {
                        ...record,
                        key: index.toString(),
                        updateAction: record,
                        listenAction: record.linkYoutube,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }
      useEffect(() => {
            const timeout = setTimeout(() => {
                  videoYoutube.length === 0 && setMountModal(false);
            }, 1000);

            return () => clearTimeout(timeout);
      }, [videoYoutube]);
      useEffect(() => {
            renderData(recordStoreAPI);
      }, []);

      return (
            <div>
                  <HeaderContent title={translate.recordStore} />
                  <input type="text" className={cx('search')} placeholder="Tên bản ghi, ca sĩ..." />
                  <div className={cx('content')}>
                        <div style={{ width: 'var(--width-table-content)' }}>
                              <div className={cx('listSelect', !isOpenSidebar() && 'sidebarClose')}>
                                    {listOption.map((option, index) => {
                                          return (
                                                <div key={index} className={cx('select')}>
                                                      <span className={cx('title')}>{option.title}</span>
                                                      <CustomizeSelect options={option.options} />
                                                </div>
                                          );
                                    })}
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

                              {viewType ? (
                                    <div className={cx('table')}>
                                          <CustomizeTable
                                                rowSelection={rowSelection}
                                                columns={columns}
                                                dataSource={dataSource}
                                                pageSize={8}
                                          />
                                    </div>
                              ) : (
                                    <div className={cx('listCardRecord')}>
                                          {dataSource.map((record) => {
                                                console.log('Hello');
                                                return <CardRecord record={record} key={record.id_ISRC} />;
                                          })}
                                    </div>
                              )}
                        </div>
                        <div>
                              {tableRowSelect.isShow ? (
                                    <CustomizeActionLink
                                          type="multi"
                                          actions={[
                                                {
                                                      logo: <LogoCheckedCircle />,
                                                      title: 'Phê duyệt',
                                                      type: 'button',
                                                      onClick: (prev) =>
                                                            setTableRowSelect({
                                                                  ...prev,
                                                                  isShow: false,
                                                                  listSelected: [],
                                                            }),
                                                },
                                                {
                                                      logo: <LogoXmarkCircle />,
                                                      title: 'Từ chối',
                                                      type: 'button',
                                                      onClick: (prev) =>
                                                            setTableRowSelect({
                                                                  ...prev,
                                                                  isShow: false,
                                                                  listSelected: [],
                                                            }),
                                                },
                                          ]}
                                    />
                              ) : (
                                    <CustomizeActionLink
                                          type="single"
                                          actions={{
                                                logo: <LogoEditCircle />,
                                                title: 'Quản lý phê duyệt',
                                                type: 'button',
                                                onClick: (prev) =>
                                                      setTableRowSelect({ ...prev, isShow: true, listSelected: [] }),
                                          }}
                                    />
                              )}
                        </div>
                  </div>
                  {mountModal ? (
                        <YoutubeBox
                              isShow={videoYoutube.length > 0}
                              handleHide={() => setVideoYoutube('')}
                              url={videoYoutube}
                        />
                  ) : (
                        <></>
                  )}
            </div>
      );
};

export default ListRecordStore;
