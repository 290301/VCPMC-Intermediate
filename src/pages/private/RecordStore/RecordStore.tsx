import classNames from 'classnames/bind';
import style from './RecordStore.module.scss';
import CustomizeSelect from '../../../components/CustomizeSelect/CustomizeSelect';
import { HeaderContent } from '../../../components/HeaderContent/HeaderContent';
import { translate } from '../../../translate';
import { LogoViewTable } from '../../../assets/svg/LogoViewTable';
import { LogoViewCard } from '../../../assets/svg/LogoViewCard';
import { CustomizeActionLink } from '../../../components/LinkActions/LinkActions';
import { LogoEditCircle } from '../../../assets/svg/LogoEdit';
import { isOpenSidebar } from '../../../constant';
import { CustomizeTable } from '../../../components/CustomizeTable/CustomizeTable';
import { recordStoreAPI } from '../../../api/recordStore';
import dayjs from 'dayjs';
import { RecordType } from '../../../types/RecordStore';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';
import { CardRecord } from '../../../components/CardRecord/CardRecord';
import { sassNull } from 'sass';
const cx = classNames.bind(style);

const RecordStore = () => {
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
                        return index;
                  },
            },
            {
                  title: 'Tên bài hát',
                  dataIndex: 'name',
            },
            {
                  title: 'Mã ISRD',
                  dataIndex: 'id_ISRD',
            },
            {
                  title: 'Thời lượng',
                  dataIndex: 'duration',
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
                        return dayjs(time).format('DD/MM/YYYY');
                  },
            },
            {
                  title: '',
                  dataIndex: 'updateAction',
                  render: (data: string) => {
                        return (
                              <>
                                    <Link
                                          className="text-underline"
                                          to={`${routesConfig.administer.replace('/:id', '')}/${data.replace(
                                                'Cập nhật',
                                                '',
                                          )}`}
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
                              <>
                                    <Link
                                          className="text-underline"
                                          to={`${routesConfig.administer.replace('/:id', '')}/${data.replace(
                                                'Chi tiết',
                                                '',
                                          )}`}
                                    >
                                          Chi tiết
                                    </Link>
                              </>
                        );
                  },
            },
      ];
      const [dataSource, setDataSource] = useState<RecordType[] | []>([]);
      const dataRef = useRef<RecordType[] | []>([]);
      const [viewType, setViewType] = useState<'table' | 'card'>('card');

      function renderData(data: RecordType[]) {
            var arr = data.map((record: RecordType, index) => {
                  return {
                        ...record,
                        key: index.toString(),
                        updateAction: `Cập nhật${record.id_ISRD}`,
                        listenAction: `Nghe${record.id_ISRD}`,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }

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
                                                className={cx('logoViewTable', viewType === 'table' && 'active')}
                                                onClick={() => setViewType('table')}
                                          >
                                                <LogoViewTable />
                                          </div>
                                          <div
                                                className={cx('logoViewCard', viewType === 'card' && 'active')}
                                                onClick={() => setViewType('card')}
                                          >
                                                <LogoViewCard />
                                          </div>
                                    </div>
                              </div>
                              {viewType === 'table' ? (
                                    <CustomizeTable columns={columns} dataSource={dataSource} pageSize={7} />
                              ) : (
                                    <div className={cx('listCardRecord')}>
                                          {dataSource.map((record) => {
                                                return <CardRecord record={record} key={record.id_ISRD} />;
                                          })}
                                    </div>
                              )}
                        </div>
                        <div>
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          logo: <LogoEditCircle />,
                                          title: 'Quản lý phê duyệt',
                                          type: 'button',
                                          onClick: () => alert('123'),
                                    }}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default RecordStore;
