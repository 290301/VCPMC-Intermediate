import classNames from 'classnames/bind';
import { LogoEdit } from '../../assets/svg/LogoEdit';
import { RecordType } from '../../types/RecordStore';
import style from './CardRecord.module.scss';
const cx = classNames.bind(style);

type CardRecordProps = {
      record: RecordType;
};
export const CardRecord = ({ record }: CardRecordProps) => {
      return (
            <div className={cx('wrapperCard')}>
                  <div className={cx('image')}>
                        <img src={record.img} />
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
                                          <p className={cx('content')}>{record.duration}</p>
                                    </div>
                              </>

                              <div className={cx('logoEdit')}>
                                    <LogoEdit />
                              </div>
                        </div>
                  </div>
            </div>
      );
};
