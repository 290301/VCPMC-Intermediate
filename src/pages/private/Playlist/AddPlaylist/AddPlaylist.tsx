import { Select, Switch } from 'antd';
import './AddPlaylist.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { LogoUpload } from '../../../../assets/svg/LogoUpload';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { toggleSidebar } from '../../../../redux/Slice/Sidebar';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './AddPlaylist.module.scss';
import { CustomizeTable } from '../../../../components/CustomizeTable/CustomizeTable';
import CustomizeButton from '../../../../components/CustomizeButton/CustomizeButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecordType } from '../../../../types/RecordStore';
import { formatDuration } from '../../../../constant';
import { YoutubeBox } from '../../../../components/YoutubeBox/YoutubeBox';
const cx = classNames.bind(style);

const AddPlayList = () => {
      const dataPlaylist = useLocation().state;
      const [youtubeBox, setYoutubeBox] = useState<{ url: string; mount: boolean }>({ url: '', mount: false });
      const [dataSource, setDataSource] = useState<RecordType[]>(dataPlaylist?.tableRecord || []);
      const navigate = useNavigate();
      const dispatch = useDispatch<any>();
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
                  dataIndex: 'removeAction',
                  render: (data: RecordType) => {
                        return (
                              <>
                                    <p>{data.name}</p>
                                    <p>
                                          <span
                                                style={{
                                                      color: 'var(--color-text-stroke-2)',
                                                      fontSize: '12px',
                                                      marginTop: '2px',
                                                }}
                                          >
                                                {data.type}
                                          </span>{' '}
                                          <span style={{ color: 'var(--color-blue)' }}>&#9679; &nbsp;</span>
                                          <span
                                                style={{
                                                      color: 'var(--color-text-stroke-2)',
                                                      fontSize: '12px',
                                                      marginTop: '2px',
                                                }}
                                          >
                                                {data.format}
                                          </span>{' '}
                                          <span style={{ color: 'var(--color-blue)' }}>&#9679; &nbsp;</span>
                                          <span
                                                style={{
                                                      color: 'var(--color-text-stroke-2)',
                                                      fontSize: '12px',
                                                      marginTop: '2px',
                                                }}
                                          >
                                                {formatDuration(data.duration)}
                                          </span>
                                    </p>
                              </>
                        );
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
            {
                  title: '',
                  dataIndex: 'id_ISRC',
                  render: (id_ISRC: string) => {
                        return (
                              <p
                                    onClick={() =>
                                          setDataSource((prev: RecordType[]) =>
                                                prev.filter((item) => item.id_ISRC !== id_ISRC),
                                          )
                                    }
                                    className="text-underline"
                              >
                                    Gỡ
                              </p>
                        );
                  },
            },
      ];

      useEffect(() => {
            dispatch(toggleSidebar({ type: 'fixed', isOpen: false }));
      }, []);
      return (
            <>
                  <HeaderContent title="Thêm playlist" />
                  <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                              <div className={cx('info-Playlist')}>
                                    <div className={cx('row', 'block')}>
                                          <p className={cx('title')}>Ảnh bìa: </p>
                                          <button type="button" className={cx('btn-upload')}>
                                                <LogoUpload />
                                                <span>Tải lên</span>
                                          </button>
                                    </div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('row', 'block')}>
                                          <label className={cx('title')}>
                                                Tiêu đề: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <input className={cx('input')} type="text" />
                                    </div>
                                    <div className={cx('line')}></div>

                                    <div className={cx('row', 'flex')}>
                                          <p className={cx('title')}>Tổng số: </p>
                                          <span className={cx('')}>{dataSource.length || 0} bản ghi</span>
                                    </div>
                                    <div className={cx('row', 'flex')}>
                                          <p style={{ marginBottom: 0 }} className={cx('title')}>
                                                Tổng thời lượng:{' '}
                                          </p>
                                          <span className={cx('')}>
                                                {dataSource.length > 0 ? (
                                                      formatDuration(
                                                            dataSource.reduce(
                                                                  (prev, current) => prev + current.duration,
                                                                  0,
                                                            ) as unknown as number,
                                                      )
                                                ) : (
                                                      <>--:--:--</>
                                                )}
                                          </span>
                                    </div>
                                    <div className={cx('line')}></div>

                                    <div className={cx('row', 'block')}>
                                          <label className={cx('title')}>Mô tả: </label>
                                          <textarea rows={4} className={cx('input')} />
                                    </div>
                                    <div className={cx('line')}></div>

                                    <div className={cx('row', 'block')}>
                                          <label className={cx('title')}>Chủ đề: </label>
                                          <Select
                                                popupClassName="AddPlayList-Popup"
                                                className="AddPlayList"
                                                style={{ width: '100%' }}
                                                mode="tags"
                                                options={[
                                                      {
                                                            label: 'Chill',
                                                            value: 'Chill',
                                                      },
                                                      {
                                                            label: 'Lofi',
                                                            value: 'Lofi',
                                                      },
                                                      {
                                                            label: 'Mashup',
                                                            value: 'Mashup',
                                                      },
                                                      {
                                                            label: 'Pop',
                                                            value: 'Pop',
                                                      },
                                                      {
                                                            label: 'Songs',
                                                            value: 'Songs',
                                                      },
                                                ]}
                                          />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                          <Switch />
                                          &nbsp;
                                          <span style={{ display: 'inline' }} className={cx('title')}>
                                                Chế độ công khai
                                          </span>
                                    </div>
                              </div>
                              <div className={cx('table')}>
                                    {dataSource.length > 0 ? (
                                          <CustomizeTable
                                                minHeight="490px"
                                                columns={columns}
                                                dataSource={dataSource}
                                                pageSize={8}
                                          />
                                    ) : (
                                          <>
                                                <div className={cx('table-noDataSource')}>
                                                      <span>STT</span>
                                                      <span>Tên bản ghi</span>
                                                      <span>Ca sĩ</span>
                                                      <span>Tác giả</span>
                                                </div>
                                                <h3>
                                                      Vui lòng chọn bản ghi để thêm vào Playlist{' '}
                                                      <span style={{ color: 'red' }}>*</span>{' '}
                                                </h3>
                                                <div className={cx('line')}></div>
                                          </>
                                    )}
                              </div>
                        </div>
                        <div className={cx('actions')}>
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          title: 'Thêm bản ghi',
                                          logo: <LogoPlus />,
                                          type: 'Link',
                                          to: routesConfig.addRecordToPlaylist,
                                    }}
                              />
                        </div>
                  </div>
                  <div className={cx('required')}>
                        <div></div>
                        <div>
                              {' '}
                              <span style={{ color: 'red' }}>*</span>
                              <span style={{ color: 'var(--color-text-stroke-2)', fontSize: '12px' }}>
                                    Là những trường thông tin bắt buộc
                              </span>
                        </div>
                  </div>
                  <div className={cx('buttons')}>
                        <CustomizeButton
                              type="button"
                              title="Hủy"
                              typeUI="outline"
                              onClick={() => navigate(routesConfig.playList)}
                        />
                        <CustomizeButton
                              type="button"
                              title="Lưu"
                              typeUI="primary"
                              onClick={() => console.log('Lưu')}
                        />
                  </div>
                  {youtubeBox.mount ? (
                        <YoutubeBox
                              isShow={youtubeBox.url.length > 0}
                              handleHide={() => setYoutubeBox({ url: '', mount: true })}
                              url={youtubeBox.url}
                        />
                  ) : null}
            </>
      );
};

export default AddPlayList;
