import classNames from 'classnames/bind';
import style from './ListRecordStore.module.scss';
import CustomizeSelect from '../../../../components/CustomizeSelect/CustomizeSelect';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { translate } from '../../../../translate';
import { LogoViewTable } from '../../../../assets/svg/LogoViewTable';
import { LogoViewCard } from '../../../../assets/svg/LogoViewCard';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { LogoEditCircle } from '../../../../assets/svg/LogoEdit';
import { formatDuration, renderTextFromTime } from '../../../../constant';
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
import { Checkbox, Modal } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import CustomizeButton from '../../../../components/CustomizeButton/CustomizeButton';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../../redux/Slice/Sidebar';
const cx = classNames.bind(style);

const ListRecordStore = () => {
      const dataRef = useRef<RecordType[] | []>([]);
      const dispatch = useDispatch<any>();
      const [dataSource, setDataSource] = useState<RecordType[] | []>([]);
      const [youtubeBox, setYoutubeBox] = useState<{ url: string; mount: boolean }>({ url: '', mount: false });
      const [modalDenied, setModalDenied] = useState<boolean>(false);
      const [isApprove, setIsApprove] = useState<{ isShow: boolean; listSelectedKey: any[] }>({
            isShow: false,
            listSelectedKey: [],
      });

      const [viewType, setViewType] = useState<boolean>(true);
      const listOption = [
            {
                  title: 'Th??? lo???i',
                  options: [
                        { value: 'all', label: 'T???t c???' },
                        { value: 'pop', label: 'Pop' },
                        { value: 'edm', label: 'EDM' },
                        { value: 'ballad', label: 'Ballad' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
            },
            {
                  title: '?????nh d???ng',
                  options: [
                        { value: 'all', label: 'T???t c???' },
                        { value: 'music', label: 'Music' },
                        { value: 'video', label: 'Video' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
            },
            {
                  title: 'Th???i h???n s??? d???ng',
                  options: [
                        { value: 'all', label: 'T???t c???' },
                        { value: 'valid', label: 'C??n th???i h???n' },
                        { value: 'invalid', label: 'H???t th???i h???n' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
            },
            {
                  title: 'Tr???ng th??i',
                  options: [
                        { value: 'all', label: 'T???t c???' },
                        { value: 'user', label: 'Duy???t b???i ng?????i d??ng' },
                        { value: 'automatic', label: 'Duy???t t??? ?????ng' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
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
                  title: 'T??n b??i h??t',
                  dataIndex: 'name',
            },
            {
                  title: 'M?? ISRC',
                  dataIndex: 'id_ISRC',
            },
            {
                  title: 'Th???i l?????ng',
                  dataIndex: 'duration',
                  render: (seconds: number) => {
                        return <p style={{ textAlign: 'right' }}>{formatDuration(seconds)}</p>;
                  },
            },
            {
                  title: 'Ca s??',
                  dataIndex: 'singer',
            },
            {
                  title: 'T??c gi???',
                  dataIndex: 'author',
            },
            {
                  title: 'Th??? lo???i',
                  dataIndex: 'type',
            },
            {
                  title: '?????nh d???ng',
                  dataIndex: 'format',
            },
            {
                  title: 'Th???i h???n s??? d???ng',
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
                                          C???p nh???t
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
                                          setYoutubeBox({ mount: true, url: data });
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
            setIsApprove({ listSelectedKey: [...selectedRowKeys], isShow: true });
      };
      const rowSelection: RowSelection = {
            isShowRowSelection: isApprove.isShow,
            onChange: onChangeRowSelect,
            selectedRowKeys: isApprove.listSelectedKey,
      };

      function renderData(data: RecordType[]) {
            var arr = data.map((record: RecordType) => {
                  return {
                        ...record,
                        key: record.id_ISRC,
                        updateAction: record,
                        listenAction: record.linkYoutube,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }

      useEffect(() => {
            const timeout = setTimeout(() => {
                  youtubeBox.url.length === 0 && setYoutubeBox({ url: '', mount: false });
            }, 1000);

            return () => clearTimeout(timeout);
      }, [youtubeBox.url]);

      useEffect(() => {
            renderData(recordStoreAPI);
            dispatch(toggleSidebar({ type: 'block', isOpen: false }));
      }, []);

      return (
            <div>
                  <HeaderContent title={translate.recordStore} />
                  <input type="text" className={cx('search')} placeholder="T??n b???n ghi, ca s??..." />
                  <div className={cx('content')}>
                        <div style={{ width: 'var(--width-content-sidebar-open)' }}>
                              <div className={cx('listSelect')}>
                                    {listOption.map((option, index) => {
                                          return (
                                                <div key={index} className={cx('select')}>
                                                      <span className={cx('title')}>{option.title}</span>
                                                      <CustomizeSelect
                                                            onChange={option.onChange}
                                                            options={option.options}
                                                      />
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
                                    <Checkbox.Group
                                          value={isApprove.listSelectedKey}
                                          onChange={(e) => setIsApprove({ listSelectedKey: [...e], isShow: true })}
                                    >
                                          <div className={cx('listCardRecord')}>
                                                {dataSource.map((record) => {
                                                      return (
                                                            <CardRecord
                                                                  checkbox={
                                                                        isApprove.isShow && (
                                                                              <Checkbox value={record.id_ISRC} />
                                                                        )
                                                                  }
                                                                  onClick={() => {
                                                                        setYoutubeBox({
                                                                              url: record.linkYoutube,
                                                                              mount: true,
                                                                        });
                                                                  }}
                                                                  record={record}
                                                                  key={record.id_ISRC}
                                                            />
                                                      );
                                                })}
                                          </div>
                                    </Checkbox.Group>
                              )}
                        </div>
                        <div>
                              {isApprove.isShow ? (
                                    <CustomizeActionLink
                                          type="multi"
                                          actions={[
                                                {
                                                      logo: <LogoCheckedCircle />,
                                                      title: 'Ph?? duy???t',
                                                      type: 'button',
                                                      onClick: () => {
                                                            if (isApprove.listSelectedKey.length > 0) {
                                                                  setIsApprove({ isShow: false, listSelectedKey: [] });
                                                            } else {
                                                                  alert('Vui l??ng ch???n ??t nh???t 1 b???n ghi');
                                                            }
                                                      },
                                                },
                                                {
                                                      logo: <LogoXmarkCircle />,
                                                      title: 'T??? ch???i',
                                                      type: 'button',
                                                      onClick: () => {
                                                            if (isApprove.listSelectedKey.length > 0) {
                                                                  setModalDenied(true);
                                                            } else {
                                                                  alert('Vui l??ng ch???n ??t nh???t 1 b???n ghi');
                                                            }
                                                      },
                                                },
                                          ]}
                                    />
                              ) : (
                                    <CustomizeActionLink
                                          type="single"
                                          actions={{
                                                logo: <LogoEditCircle />,
                                                title: 'Qu???n l?? ph?? duy???t',
                                                type: 'button',
                                                onClick: () => setIsApprove({ isShow: true, listSelectedKey: [] }),
                                          }}
                                    />
                              )}
                        </div>
                  </div>
                  {youtubeBox.mount ? (
                        <YoutubeBox
                              isShow={youtubeBox.url.length > 0}
                              handleHide={() => setYoutubeBox({ url: '', mount: true })}
                              url={youtubeBox.url}
                        />
                  ) : null}

                  <Modal
                        onCancel={() => setModalDenied(false)}
                        open={modalDenied}
                        footer={null}
                        width="600px"
                        closeIcon={<></>}
                        centered={true}
                  >
                        <h2 className={cx('heading')}>L?? do t??? ch???i ph?? duy???t</h2>
                        <textarea
                              className={cx('text-area')}
                              rows={8}
                              placeholder="Cho ch??ng t??i bi???t l?? do b???n mu???n t??? ch???i ph?? duy???t b???n ghi n??y..."
                        />
                        <div className={cx('buttons')}>
                              <CustomizeButton
                                    type="button"
                                    typeUI="outline"
                                    title="H???y"
                                    onClick={() => setModalDenied(false)}
                              />
                              <CustomizeButton
                                    type="button"
                                    typeUI="primary"
                                    title="T??? ch???i"
                                    onClick={() => {
                                          setIsApprove({ isShow: false, listSelectedKey: [] });
                                          setModalDenied(false);
                                    }}
                              />
                        </div>
                  </Modal>
            </div>
      );
};

export default ListRecordStore;
