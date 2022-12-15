import classNames from 'classnames/bind';
import style from './UpdateRecordStore.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContent } from '../../../../components/HeaderContent/HeaderContent';
import { RecordType } from '../../../../types/RecordStore';
import { CustomizeActionLink } from '../../../../components/LinkActions/LinkActions';
import { LogoXmarkCircle } from '../../../../assets/svg/LogoXmarks';
import { Image } from 'antd';
import { LogoCamera } from '../../../../assets/svg/LogoCamera';
import CustomizeButton from '../../../../components/CustomizeButton/CustomizeButton';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { renderTextFromTime } from '../../../../constant';

const cx = classNames.bind(style);
export const UpdateRecord = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const data: RecordType = location.state;

      // ------------------------------ Schema form User
      const schemaUser: yup.SchemaOf<Partial<RecordType>> = yup.object({
            name: yup.string().notRequired(),
            author: yup.string().notRequired(),
            duration: yup.string().notRequired(),
            format: yup.string().notRequired(),
            id_ISRC: yup.string().notRequired(),
            img: yup.string().notRequired(),
            key: yup.string().notRequired(),
            singer: yup.string().notRequired(),
            timeValid: yup.number().notRequired(),
            type: yup.string().notRequired(),
            linkYoutube: yup.string().notRequired(),
      });
      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<RecordType>({
            defaultValues: data,
            resolver: yupResolver(schemaUser),
      });
      const onSubmit: SubmitHandler<RecordType> = async (data: RecordType) => {
            try {
                  console.log(data);
            } catch (error) {
                  console.log(error);
            }
      };
      return (
            <>
                  <HeaderContent title={'Bản ghi - ' + data.name} />
                  <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                              <div className={cx('block-content')}>
                                    <div className={cx('leftContent')}>
                                          <div className={cx('block', 'top')}>
                                                <h2 className={cx('title-block')}>Thông tin bản ghi</h2>
                                                <div className={cx('image')}>
                                                      <div>
                                                            <Image src={data.img} />
                                                            <div className={cx('svg')}>
                                                                  <LogoCamera />
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Ngày thêm:</p>
                                                      <p className={cx('value')}>07/04/2021 - 17:45:30</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Người tải lên:</p>
                                                      <p className={cx('value')}>Super Amdin</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Người duyệt:</p>
                                                      <p className={cx('value')}>Hệ thống (tự động phê duyệt)</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Ngày phê duyệt:</p>
                                                      <p className={cx('value')}>07/04/2021 - 17:45:50</p>
                                                </div>
                                          </div>
                                          <div className={cx('block', 'bottom')}>
                                                <h2 className={cx('title-block')}>Thông tin ủy quyền</h2>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Số hợp đồng:</p>
                                                      <p className={cx('value')}>BH123</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Ngày nhận ủy quyền:</p>
                                                      <p className={cx('value')}>01/05/2021</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Ngày hết hạn:</p>
                                                      <p className={cx('value')}>01/08/2025</p>
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('key')}>Trạng thái:</p>
                                                      <p className={cx('value')}>
                                                            {renderTextFromTime(data.timeValid)}
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={cx('rightContent')}>
                                          <div className={cx('block')}>
                                                <h2 className={cx('title-block')}>Chỉnh sửa bản ghi</h2>
                                                <form>
                                                      <div className={cx('form-control')}>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Tên bản ghi:</label>
                                                                  <br />
                                                                  <input
                                                                        {...register('name')}
                                                                        className={cx('input')}
                                                                        type="text"
                                                                  />
                                                            </div>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Mã ISRC</label>
                                                                  <br />
                                                                  <input
                                                                        {...register('id_ISRC')}
                                                                        className={cx('input')}
                                                                        type="text"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className={cx('form-control')}>
                                                            <div className={cx('form-item')}></div>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Ca sĩ:</label>
                                                                  <br />
                                                                  <input
                                                                        {...register('singer')}
                                                                        className={cx('input')}
                                                                        type="text"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className={cx('form-control')}>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Tác giả:</label>
                                                                  <br />
                                                                  <input
                                                                        {...register('author')}
                                                                        className={cx('input')}
                                                                        type="text"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className={cx('form-control')}>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Nhà sản xuất: </label>
                                                                  <br />
                                                                  <input className={cx('input')} type="text" />
                                                            </div>
                                                      </div>
                                                      <div className={cx('form-control')}>
                                                            <div className={cx('form-item')}>
                                                                  <label className={cx('label')}>Thể loại:</label>
                                                                  <br />
                                                                  <input
                                                                        {...register('type')}
                                                                        className={cx('input')}
                                                                        type="text"
                                                                  />
                                                            </div>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                              <div className={cx('buttons')}>
                                    <CustomizeButton
                                          title="Hủy"
                                          type="button"
                                          typeUI="outline"
                                          onClick={() => navigate(-1)}
                                    />
                                    <CustomizeButton
                                          title="Lưu"
                                          type="button"
                                          typeUI="primary"
                                          onClick={() => alert('123')}
                                    />
                              </div>
                        </div>
                        <div className={cx('action')}>
                              <CustomizeActionLink
                                    type="single"
                                    actions={{
                                          type: 'button',
                                          logo: <LogoXmarkCircle />,
                                          title: 'Xóa bản ghi',
                                          onClick: () => alert('Click me'),
                                    }}
                              />
                        </div>
                  </div>
            </>
      );
};
