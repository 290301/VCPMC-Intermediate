import { DatePicker, Image, Modal } from 'antd';
import './InfoUser.css';
import classNames from 'classnames/bind';
import style from './InfoUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContent } from '../../../components/HeaderContent/HeaderContent';
import { RootState } from '../../../redux/store';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserType } from '../../../types/User';
import dayjs from 'dayjs';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { useEffect, useState } from 'react';
import { ButtonType, CustomizeActionLink, LinkType } from '../../../components/LinkActions/LinkActions';
import { LogoEditCircle } from '../../../assets/svg/LogoEdit';
import { LogoLogoutCircle } from '../../../assets/svg/LogoLogout';
import { Logout, UpdatePassword, UpdateUser } from '../../../redux/Slice/User';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';
import { toast } from 'react-toastify';
import ErrorMessage from '../../../components/ErrorMessageForm/ErrorMessageForm';

import { LogoClockCircle } from '../../../assets/svg/LogoClock';
import { toggleSidebar } from '../../../redux/Slice/Sidebar';
const cx = classNames.bind(style);
export const InfoUser = () => {
      const dispatch = useDispatch<any>();
      const navigate = useNavigate();
      const [isEdit, setIsEdit] = useState<boolean>(false);
      const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
      const currentUser = useSelector((state: RootState) => state.user.currentUser);
      const dataRole = useSelector((state: RootState) => state.role.data);
      const roleName = dataRole.find((role) => role.roleID === currentUser.roleID);
      const [datePicker, setDatePicker] = useState<number>(currentUser.dateOfBirth);

      // ------------------------------ Schema form User
      const schemaUser: yup.SchemaOf<Partial<UserType>> = yup.object({
            id: yup.string().notRequired(),
            roleID: yup.string().trim().notRequired(),
            userName: yup.string().trim().notRequired(),
            password: yup.string().trim().notRequired(),
            expirationDate: yup.number().notRequired(),
            isActive: yup.boolean().notRequired(),
            email: yup.string().notRequired(),
            image: yup.string().notRequired(),
            firstName: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            lastName: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            phone: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            dateOfBirth: yup.number().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
      });
      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<UserType>({
            defaultValues: currentUser,
            resolver: yupResolver(schemaUser),
      });
      const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
            try {
                  await dispatch(UpdateUser({ ...data, dateOfBirth: datePicker }));
                  toast.success('C???p nh???t th??nh c??ng', { theme: 'dark' });
                  setIsEdit(false);
            } catch (error) {
                  console.log(error);
            }
      };

      const handleLogout = async () => {
            await dispatch(Logout());
            navigate(routesConfig.login);
      };

      const multiActions: (ButtonType | LinkType)[] = [
            {
                  logo: <LogoEditCircle />,
                  title: 'S???a th??ng tin',
                  type: 'button',
                  onClick: () => setIsEdit(true),
            },
            {
                  logo: <LogoClockCircle />,
                  title: '?????i m???t kh???u',
                  type: 'button',
                  onClick: () => setIsOpenModal(true),
            },
            {
                  logo: <LogoLogoutCircle />,
                  title: '????ng xu???t',
                  type: 'button',
                  onClick: () => {
                        handleLogout();
                  },
            },
      ];
      useEffect(() => {
            dispatch(toggleSidebar({ type: 'block', isOpen: false }));
      }, []);
      return (
            <>
                  <HeaderContent title="Th??ng tin c?? b???n" />
                  <div className={cx('content')}>
                        <div className={cx('info')}>
                              <div className={cx('leftContent')}>
                                    <Image className={cx('image')} src={currentUser.image} />
                                    <p className={cx('fullName')}>
                                          {currentUser.firstName + ' ' + currentUser.lastName}
                                    </p>
                              </div>
                              <div className={cx('rightContent')}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                          <div className={cx('form-control')}>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>H???:</label>
                                                      <br />
                                                      <input
                                                            {...register('lastName')}
                                                            className={cx('input')}
                                                            type="text"
                                                            disabled={!isEdit}
                                                      />
                                                </div>
                                                <div className={cx('form-item')}>
                                                      <label className={cx('label')}>T??n:</label>
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
                                                      <label className={cx('label')}>Ng??y sinh:</label>
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
                                                      <label className={cx('label')}>S??? ??i???n tho???i:</label>
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
                                                      <label className={cx('label')}>T??n ????ng nh???p:</label>
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
                                                      <label className={cx('label')}>Ph??n quy???n:</label>
                                                      <br />
                                                      <input
                                                            readOnly
                                                            className={cx('input', 'readOnly')}
                                                            type="text"
                                                            value={roleName?.roleName}
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('buttons', isEdit && 'show')}>
                                                <CustomizeButton
                                                      title="H???y"
                                                      type="button"
                                                      typeUI="outline"
                                                      onClick={() => setIsEdit(false)}
                                                />
                                                <CustomizeButton title="L??u" type="submit" typeUI="primary" />
                                          </div>
                                    </form>
                              </div>
                        </div>
                        <div className={cx('actions')}>
                              <CustomizeActionLink type="multi" actions={multiActions} />
                        </div>
                  </div>
                  <ModalChangePassword isShow={isOpenModal} handleHide={() => setIsOpenModal(false)} />
            </>
      );
};

const ModalChangePassword = ({ isShow, handleHide }: { isShow: boolean; handleHide: () => void }) => {
      type ChangePassword = {
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
      };
      const user = useSelector((state: RootState) => state.user);
      const [defaultValuesForm, setDefaultValuesForm] = useState({} as ChangePassword);
      const dispatch = useDispatch<any>();
      // ------------------------------ Schema form User
      const schema: yup.SchemaOf<Partial<ChangePassword>> = yup.object({
            currentPassword: yup
                  .string()
                  .required('Vui l??ng ??i???n v??o tr?????ng n??y')
                  .test('isExists', 'M???t kh???u hi???n t???i kh??ng ch??nh x??c', (value) => {
                        return user.currentUser.password === value ? true : false;
                  }),
            newPassword: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            confirmPassword: yup
                  .string()
                  .required('Vui l??ng ??i???n v??o tr?????ng n??y')
                  .oneOf([yup.ref('newPassword'), null], '2 m???t kh???u ph???i tr??ng nhau'),
      });
      const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
      } = useForm<ChangePassword>({
            defaultValues: defaultValuesForm,
            resolver: yupResolver(schema),
      });

      // Refresh value when open modal
      useEffect(() => {
            reset({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
            });
      }, [isShow]);

      const onSubmit: SubmitHandler<ChangePassword> = async (data: ChangePassword) => {
            try {
                  await dispatch(UpdatePassword({ idUser: user.currentUser.id, newPassword: data.newPassword }));
                  toast.success('?????i m???t kh???u th??nh c??ng', {
                        theme: 'dark',
                        position: 'bottom-center',
                        pauseOnHover: false,
                        style: { backgroundColor: '#727288', color: '#fff', marginBottom: '50px' },
                  });
                  handleHide();
            } catch (error) {
                  console.log(error);
            }
      };
      return (
            <Modal
                  onCancel={handleHide}
                  open={isShow}
                  className="infoUser_modal"
                  footer={null}
                  closeIcon={<></>}
                  centered={true}
            >
                  <h2 className={cx('titleModal')}>Thay ?????i m???t kh???u</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className={cx('form-control', 'modal')}>
                        <div className={cx('form-item')}>
                              <label className={cx('label')}>M???t kh???u hi???n t???i</label>
                              <input
                                    {...register('currentPassword')}
                                    name="currentPassword"
                                    className={cx('input')}
                                    type="password"
                              />
                              {errors.currentPassword?.message && (
                                    <ErrorMessage title={errors.currentPassword?.message || 'Hello'} isShow={true} />
                              )}
                        </div>
                        <div className={cx('form-item')}>
                              <label className={cx('label')}>M???t kh???u m???i</label>
                              <input
                                    {...register('newPassword')}
                                    name="newPassword"
                                    className={cx('input')}
                                    type="password"
                              />
                              {errors.newPassword?.message && (
                                    <ErrorMessage title={errors.newPassword?.message} isShow={true} />
                              )}
                        </div>
                        <div className={cx('form-item')}>
                              <label className={cx('label')}>Nh???p l???i m???t kh???u m???i</label>
                              <input
                                    {...register('confirmPassword')}
                                    name="confirmPassword"
                                    className={cx('input')}
                                    type="password"
                              />
                              {errors.confirmPassword?.message && (
                                    <ErrorMessage title={errors.confirmPassword?.message} isShow={true} />
                              )}
                        </div>
                        <div className={cx('buttons')}>
                              <CustomizeButton
                                    style={{ minWidth: '150px', padding: '10px 30px' }}
                                    title="H???y"
                                    type="button"
                                    typeUI="outline"
                                    onClick={handleHide}
                              />
                              <CustomizeButton
                                    style={{ minWidth: '150px', padding: '10px 30px' }}
                                    title="L??u"
                                    type="submit"
                                    typeUI="primary"
                                    isLoading={user.statusRequest === 'pending'}
                              />
                        </div>
                  </form>
            </Modal>
      );
};
