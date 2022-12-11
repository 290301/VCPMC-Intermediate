import { DatePicker, Image, Modal } from 'antd';
import './InfoUser.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContent } from '../../../components/HeaderContent/HeaderContent';
import { RootState } from '../../../redux/store';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './InfoUser.module.scss';
import { UserType } from '../../../types/Account';
import dayjs from 'dayjs';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { useState } from 'react';
import { ButtonType, CustomizeActionLink, LinkType } from '../../../components/LinkActions/LinkActions';
import { LogoEdit } from '../../../assets/svg/LogoEdit';
import { LogoClock } from '../../../assets/svg/LogoClock';
import { LogoLogout } from '../../../assets/svg/LogoLogout';
import { Logout } from '../../../redux/Slice/User';
import { Navigate, useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';
const cx = classNames.bind(style);
export const InfoUser = () => {
      const [isEdit, setIsEdit] = useState<boolean>(false);
      const dispatch = useDispatch<any>();
      const navigate = useNavigate();
      const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
      const currentUser = useSelector((state: RootState) => state.user.currentUser);
      const [datePicker, setDatePicker] = useState<number>(currentUser.dateOfBirth);
      const schema: yup.SchemaOf<Partial<UserType>> = yup.object({
            id: yup.string().notRequired(),
            roleID: yup.string().trim().notRequired(),
            userName: yup.string().trim().notRequired(),
            password: yup.string().trim().notRequired(),
            email: yup.string().notRequired(),
            image: yup.string().notRequired(),
            firstName: yup.string().required('Vui lòng điền vào trường này'),
            lastName: yup.string().required('Vui lòng điền vào trường này'),
            phone: yup.string().required('Vui lòng điền vào trường này'),
            dateOfBirth: yup.number().required('Vui lòng điền vào trường này'),
      });

      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<UserType>({
            defaultValues: currentUser,
            resolver: yupResolver(schema),
      });

      const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
            try {
                  console.log({ ...data, dateOfBirth: datePicker });
            } catch (error) {}
      };

      const handleLogout = async () => {
            await dispatch(Logout());
            navigate(routesConfig.login);
      };

      const multiActions: (ButtonType | LinkType)[] = [
            {
                  logo: <LogoEdit />,
                  title: 'Sửa thông tin',
                  type: 'button',
                  onClick: () => setIsEdit(true),
            },
            {
                  logo: <LogoClock />,
                  title: 'Đổi mật khẩu',
                  type: 'button',
                  onClick: () => setIsOpenModal(true),
            },
            {
                  logo: <LogoLogout />,
                  title: 'Đăng xuất',
                  type: 'button',
                  onClick: () => {
                        handleLogout();
                  },
            },
      ];

      return (
            <>
                  <HeaderContent title="Thông tin cơ bản" />
                  <div className={cx('content')}>
                        <div className={cx('info')}>
                              <div className={cx('leftContent')}>
                                    <Image className={cx('image')} src={currentUser.image} />
                                    <p className={cx('fullName')}>Tuyết Nguyễn</p>
                              </div>
                              <div className={cx('rightContent')}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Họ:</label>
                                                      <br />
                                                      <input
                                                            {...register('lastName')}
                                                            className={cx('input')}
                                                            type="text"
                                                            disabled={!isEdit}
                                                      />
                                                </div>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Tên:</label>
                                                      <br />
                                                      <input
                                                            {...register('firstName')}
                                                            className={cx('input')}
                                                            type="text"
                                                            disabled={!isEdit}
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Ngày sinh:</label>
                                                      <br />
                                                      <Controller
                                                            name="dateOfBirth"
                                                            rules={{ required: true }}
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <DatePicker
                                                                        format="DD/MM/YYYY"
                                                                        value={dayjs(datePicker)}
                                                                        onChange={(e) =>
                                                                              setDatePicker(e?.unix()! * 1000)
                                                                        }
                                                                        className={cx('input')}
                                                                        disabled={!isEdit}
                                                                  />
                                                            )}
                                                      />
                                                </div>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Số điện thoại:</label>
                                                      <br />
                                                      <input
                                                            {...register('phone')}
                                                            className={cx('input')}
                                                            type="text"
                                                            disabled={!isEdit}
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Email:</label>
                                                      <br />
                                                      <input
                                                            {...register('email')}
                                                            readOnly
                                                            className={cx('input', 'readOnly')}
                                                            type="text"
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Tên đăng nhập:</label>
                                                      <br />
                                                      <input
                                                            {...register('userName')}
                                                            readOnly
                                                            className={cx('input', 'readOnly')}
                                                            type="text"
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>Phân quyền:</label>
                                                      <br />
                                                      <input
                                                            {...register('roleID')}
                                                            readOnly
                                                            className={cx('input', 'readOnly')}
                                                            type="text"
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('buttons', isEdit && 'show')}>
                                                <CustomizeButton
                                                      title="Hủy"
                                                      type="button"
                                                      typeUI="outline"
                                                      onClick={() => setIsEdit(false)}
                                                />
                                                <CustomizeButton title="Lưu" type="submit" typeUI="primary" />
                                          </div>
                                    </form>
                              </div>
                        </div>
                        <div className={cx('actions')}>
                              <CustomizeActionLink type="multi" actions={multiActions} />
                        </div>
                  </div>
                  <Modal open={isOpenModal} className="infoUser_modal" footer={null} closeIcon={<></>} centered={true}>
                        <h2 className={cx('titleModal')}>Thay đổi mật khẩu</h2>
                        <form className={cx('form-control', 'modal')}>
                              <div className={cx('form-item')}>
                                    <label className={cx('label')}>Mật khẩu hiện tại</label>
                                    <input className={cx('input')} type="password" />
                              </div>
                              <div className={cx('form-item')}>
                                    <label className={cx('label')}>Mật khẩu mới</label>
                                    <input className={cx('input')} type="password" />
                              </div>
                              <div className={cx('form-item')}>
                                    <label className={cx('label')}>Nhập lại mật khẩu mới</label>
                                    <input className={cx('input')} type="password" />
                              </div>
                              <div className={cx('buttons')}>
                                    <CustomizeButton
                                          style={{ minWidth: '150px', padding: '10px 30px' }}
                                          title="Hủy"
                                          type="button"
                                          typeUI="outline"
                                          onClick={() => setIsOpenModal(false)}
                                    />
                                    <CustomizeButton
                                          style={{ minWidth: '150px', padding: '10px 30px' }}
                                          title="Lưu"
                                          type="submit"
                                          typeUI="primary"
                                    />
                              </div>
                        </form>
                  </Modal>
            </>
      );
};
