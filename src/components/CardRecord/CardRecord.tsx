import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { LogoEdit } from '../../assets/svg/LogoEdit';
import { LogoInfoCircle } from '../../assets/svg/LogoInfo';
import { LogoPlayVideoCircle } from '../../assets/svg/LogoPlayVideo';
import { formatDuration } from '../../constant';
import { routesConfig } from '../../routes/routeConfig';
import { PlayListType } from '../../types/PlayList';
import { RecordType } from '../../types/RecordStore';
import style from './CardRecord.module.scss';
const cx = classNames.bind(style);

type CardRecordProps = {
      record: RecordType;
      onClick?: () => void;
      checkbox: React.ReactNode;
};
export const CardRecord = ({ record, checkbox, onClick }: CardRecordProps) => {
      return (
            <div className={cx('wrapperCard')}>
                  <div onClick={onClick} className={cx('image')}>
                        <img src={record.img} />
                        <div className={cx('logo-play-video')}>
                              <LogoPlayVideoCircle />
                        </div>
                  </div>
                  <div className={cx('info')}>
                        <h3 className={cx('nameRecord')}>{record.name}</h3>
                        <div className={cx('block')}>
                              <div className={cx('row')}>
                                    <span className={cx('title')}>Ca sĩ: </span>
                                    <span className={cx('content')}>{record.singer}</span>
                              </div>
                              <div className={cx('row')}>
                                    <span className={cx('title')}>Sáng tác: </span>
                                    <span className={cx('content')}>{record.author}</span>
                              </div>
                              <div className={cx('row')}>
                                    <span className={cx('title')}>Số hợp đồng: </span>
                                    <span className={cx('content')}>HD395738503</span>
                              </div>
                        </div>
                        <div className={cx('infoDetails')}>
                              <>
                                    <div className={cx('item')}>
                                          <p className={cx('title')}>Thể loại </p>
                                          <p className={cx('content')}>{record.type}</p>
                                    </div>
                                    <div className={cx('item')}>
                                          <p className={cx('title')}>Định dạng </p>
                                          <p className={cx('content')}>{record.format}</p>
                                    </div>
                                    <div className={cx('item')}>
                                          <p className={cx('title')}>Thời lượng </p>
                                          <p className={cx('content')}>{formatDuration(record.duration)}</p>
                                    </div>
                              </>
                              <div className={cx('checkbox-logoEdit')}>
                                    {checkbox ? (
                                          checkbox
                                    ) : (
                                          <Link
                                                state={{ ...record }}
                                                to={`${routesConfig.updateRecord.replace(':id', record.id_ISRC)}`}
                                          >
                                                <LogoEdit />
                                          </Link>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

type PlayListProps = {
      playList: PlayListType;
};

export const CardPlayList = ({ playList }: PlayListProps) => {
      return (
            <div className={cx('wrapperCard')}>
                  <div className={cx('image')}>
                        <img src={playList.img} />
                  </div>
                  <div className={cx('info')}>
                        <h3 style={{ marginBottom: '10px' }} className={cx('nameRecord')}>
                              {playList.name}
                        </h3>
                        <div className={cx('block')}>
                              <div style={{ margin: ' 4px 0px' }} className={cx('row')}>
                                    <span className={cx('title')}>Chủ đề: </span>
                                    <span className={cx('content')}>
                                          {playList.titles.map((title, index) => (
                                                <span
                                                      style={{
                                                            fontSize: '10px',
                                                            border: '1px solid #F5F5FF90',
                                                            borderRadius: '6px',
                                                            padding: '6px 8px',
                                                            marginRight: '4px',
                                                            color: '#F5F5FF85',
                                                      }}
                                                      key={index}
                                                >
                                                      {title}
                                                </span>
                                          ))}
                                    </span>
                              </div>
                              <div style={{ margin: ' 2px 0px' }} className={cx('row')}>
                                    <span className={cx('title')}>Người tạo: </span>
                                    <span className={cx('content')}>{playList.creator}</span>
                              </div>
                              <div style={{ margin: ' 2px 0px' }} className={cx('row')}>
                                    <span className={cx('title')}>Ngày tạo: </span>
                                    <span className={cx('content')}>
                                          {dayjs(playList.createAt).format('DD/MM/YYYY')}
                                    </span>
                              </div>
                        </div>
                        <div className={cx('infoDetails')}>
                              <>
                                    <div className={cx('item')}>
                                          <p className={cx('title')}>Số bản ghi </p>
                                          <p className={cx('content')}>{playList.quantityRecord}</p>
                                    </div>
                                    <div className={cx('item')}>
                                          <p className={cx('title')}>Thời lượng </p>
                                          <p className={cx('content')}>{formatDuration(playList.duration)}</p>
                                    </div>
                              </>
                              <div className={cx('checkbox-logoEdit')}>
                                    <Link
                                          state={{ ...playList }}
                                          to={`${routesConfig.updateRecord.replace(':id', playList.key)}`}
                                    >
                                          <LogoInfoCircle />
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
