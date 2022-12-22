import classNames from 'classnames/bind';
import style from './AddRecordToPlaylist.module.scss';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import CustomizeSelect from '../../../../components/CustomizeSelect/CustomizeSelect';
import { DefaultOptionType } from 'antd/es/select';
import { CustomizeTable } from '../../../../components/CustomizeTable/CustomizeTable';
import { RecordType } from '../../../../types/RecordStore';
import { useEffect, useRef, useState } from 'react';
import { recordStoreAPI } from '../../../../api/recordStore';
import { formatDuration } from '../../../../constant';
import { YoutubeBox } from '../../../../components/YoutubeBox/YoutubeBox';
import CustomizeButton from '../../../../components/CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
const cx = classNames.bind(style);
export const AddRecordToPlaylist = () => {
      const navigate = useNavigate();
      const [youtubeBox, setYoutubeBox] = useState<{ url: string; mount: boolean }>({ url: '', mount: false });
      const listOption = [
            {
                  title: 'Thể loại',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'pop', label: 'Pop' },
                        { value: 'edm', label: 'EDM' },
                        { value: 'ballad', label: 'Ballad' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
            },
            {
                  title: 'Định dạng',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'music', label: 'Music' },
                        { value: 'video', label: 'Video' },
                  ],
                  onChange: (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
                        console.log(value);
                  },
            },
      ];
      useEffect(() => {
            const timeout = setTimeout(() => {
                  youtubeBox.url.length === 0 && setYoutubeBox({ url: '', mount: false });
            }, 1000);

            return () => clearTimeout(timeout);
      }, [youtubeBox.url]);
      // ------------------------------------------------ table left

      const columnsTableLeft = [
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
                  dataIndex: 'addAction',
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
                  dataIndex: 'addAction',
                  render: (data: RecordType) => {
                        return (
                              <p onClick={() => handleAddRecordToPlaylist(data)} className="text-underline">
                                    Thêm
                              </p>
                        );
                  },
            },
      ];
      const [dataSourceLeft, setDataSourceLeft] = useState<RecordType[]>();
      function renderData_TableLeft(data: RecordType[]) {
            var arr = data.map((record: RecordType) => {
                  return {
                        ...record,
                        key: record.id_ISRC,
                        listenAction: record.linkYoutube,
                        addAction: record,
                  };
            });
            setDataSourceLeft(arr);
      }

      useEffect(() => {
            renderData_TableLeft(recordStoreAPI);
      }, []);

      // ------------------------------------------------ table right
      const [dataSourceRight, setDataSourceRight] = useState<RecordType[]>();
      const columnsTableRight = [
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
                  dataIndex: 'removeAction',
                  render: (data: RecordType) => {
                        return (
                              <p onClick={() => handleRemoveRecordFromPlaylist(data)} className="text-underline">
                                    Gỡ
                              </p>
                        );
                  },
            },
      ];
      const handleRemoveRecordFromPlaylist = (data: RecordType) => {
            setDataSourceRight((prev) => prev?.filter((record) => record.key !== data.id_ISRC));
            setDataSourceLeft((prev) => [
                  {
                        ...data,
                        key: data.id_ISRC,
                        listenAction: data.linkYoutube,
                        addAction: data,
                  },
                  ...(prev || []),
            ]);
      };

      const handleAddRecordToPlaylist = (data: RecordType) => {
            setDataSourceLeft((prev) => prev?.filter((record) => record.key !== data.id_ISRC));
            setDataSourceRight((prev) => [
                  ...(prev || []),
                  {
                        ...data,
                        key: data.id_ISRC,
                        listenAction: data.linkYoutube,
                        removeAction: data,
                  },
            ]);
      };

      return (
            <>
                  <HeaderContent title="Thêm bản ghi" />
                  <div className={cx('wrapper')}>
                        <div className={cx('left-content')}>
                              <h2 className={cx('title-content')}>Kho bản ghi</h2>
                              <div className={cx('after-title')}>
                                    <div className={cx('selects')}>
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
                                    </div>
                                    <div className={cx('input')}>
                                          <input type="text" placeholder="Tên ca sĩ, bản ghi..." />
                                    </div>
                              </div>
                              <CustomizeTable
                                    minHeight="381px"
                                    dataSource={dataSourceLeft || []}
                                    columns={columnsTableLeft}
                                    pageSize={6}
                              />
                        </div>
                        <div className={cx('right-content')}>
                              <h2 className={cx('title-content')}>Danh sách bản ghi được thêm vào Playlist</h2>
                              <div className={cx('after-title')}>
                                    <div className={cx('info-new-playlist')}>
                                          <div>
                                                <span className={cx('key')}>Tổng số: </span>
                                                <span className={cx('value')}>
                                                      {dataSourceRight?.length || 0} bản ghi
                                                </span>
                                          </div>
                                          <div>
                                                <span className={cx('key')}>Tổng thời lượng: </span>
                                                <span className={cx('value')}>
                                                      {dataSourceRight?.length! > 0 ? (
                                                            formatDuration(
                                                                  dataSourceRight?.reduce(
                                                                        (prev, current) => prev + current.duration,
                                                                        0,
                                                                  ) as unknown as number,
                                                            )
                                                      ) : (
                                                            <>--:--:--:</>
                                                      )}
                                                </span>
                                          </div>
                                    </div>
                                    <br />
                                    <div className={cx('input')}>
                                          <input type="text" placeholder="Tên ca sĩ, bản ghi..." />
                                    </div>
                              </div>
                              {dataSourceRight?.length! > 0 ? (
                                    <CustomizeTable
                                          minHeight="381px"
                                          columns={columnsTableRight}
                                          dataSource={dataSourceRight || []}
                                          pageSize={6}
                                    />
                              ) : (
                                    <>
                                          <h3 className={cx('special')}>
                                                Vui lòng chọn bản ghi để thêm vào Playlist{' '}
                                                <span style={{ color: 'red' }}>*</span>{' '}
                                          </h3>
                                          <div className={cx('line')}></div>
                                    </>
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
                  <div className={cx('buttons')}>
                        <CustomizeButton type="button" title="Hủy" typeUI="outline" onClick={() => navigate(-1)} />
                        <CustomizeButton
                              type="button"
                              title="Lưu"
                              typeUI="primary"
                              onClick={() =>
                                    navigate(routesConfig.addPlayList, {
                                          state: {
                                                tableRecord: dataSourceRight,
                                          },
                                    })
                              }
                        />
                  </div>
            </>
      );
};

export default AddRecordToPlaylist;
