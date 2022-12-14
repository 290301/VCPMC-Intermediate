import classNames from 'classnames/bind';
import style from './AddUser.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContent } from '../../../../../components/HeaderContent/HeaderContent';
import { toggleSidebar } from '../../../../../redux/Slice/Sidebar';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { UserType } from '../../../../../types/User';
import CustomizeButton from '../../../../../components/CustomizeButton/CustomizeButton';
import { DatePicker } from 'antd';
import CustomizeSelect from '../../../../../components/CustomizeSelect/CustomizeSelect';
import { RootState } from '../../../../../redux/store';
import { RoleType } from '../../../../../types/Role';
import ErrorMessage from '../../../../../components/ErrorMessageForm/ErrorMessageForm';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
const cx = classNames.bind(style);

const AddUser = () => {
      const dispatch = useDispatch<any>();
      const navigate = useNavigate();
      const dataRole = useSelector((state: RootState) => state.role.data);
      const [datePicker, setDatePicker] = useState<number>(new Date().getTime());
      useEffect(() => {
            dispatch(toggleSidebar({ type: 'fixed', isOpen: false }));
      }, []);

      // const optionRole: { value: string; label: JSX.Element | string }[] = dataRole.map((role:RoleType) => return <span>Hello</span>);
      const optionRole: { value: string; label: JSX.Element | string }[] = dataRole.map((role: RoleType) => {
            return {
                  value: role.roleID,
                  label: role.roleName,
            };
      });
      // ------------------------------ Schema form User
      const schemaUser: yup.SchemaOf<Partial<UserType>> = yup.object({
            id: yup.string().notRequired(),
            expirationDate: yup
                  .number()
                  .required('Vui l??ng ??i???n v??o tr?????ng n??y')
                  .test('validDate', 'Ng??y h???t h???n ph???i l???n h??n ng??y hi???n t???i', (value, index) => {
                        console.log(value, index.parent);
                        return true;
                  }),
            isActive: yup.boolean().notRequired(),
            phone: yup
                  .string()
                  .required('Vui l??ng ??i???n v??o tr?????ng n??y')
                  .phone('VN', true, 'Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i'),
            email: yup.string().notRequired().email('Vui l??ng ??i???n ????ng ?????nh d???ng email'),
            image: yup.string().notRequired(),
            dateOfBirth: yup.number().notRequired(),
            firstName: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            lastName: yup.string().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            roleID: yup.string().trim().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            userName: yup.string().trim().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
            password: yup.string().trim().required('Vui l??ng ??i???n v??o tr?????ng n??y'),
      });
      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<UserType>({
            resolver: yupResolver(schemaUser),
      });
      const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
            try {
                  console.log({ ...data, expirationDate: datePicker });
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <>
                  <HeaderContent title="Th??m ng?????i d??ng m???i" />
                  <div className={cx('wrapper')}>
                        <form className={cx('form-control')} onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                H???: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <input {...register('lastName')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.lastName?.message!}
                                                isShow={errors.lastName?.message! ? true : false}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                T??n: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <input {...register('firstName')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.firstName?.message!}
                                                isShow={errors.firstName?.message! ? true : false}
                                          />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Email:</label>
                                          <br />
                                          <input {...register('email')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.email?.message!}
                                                isShow={errors.email?.message! ? true : false}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                S??? ??i???n tho???i: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <input {...register('phone')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.phone?.message!}
                                                isShow={errors.phone?.message! ? true : false}
                                          />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                Ng??y h???t h???n: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <Controller
                                                name="expirationDate"
                                                rules={{ required: true }}
                                                control={control}
                                                render={({ field: { value, onChange, ref } }) => (
                                                      <DatePicker
                                                            ref={ref}
                                                            defaultValue={dayjs(value)}
                                                            onChange={onChange}
                                                            format="DD/MM/YYYY"
                                                            className={cx('input')}
                                                      />
                                                )}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                T??n ????ng nh???p: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <input {...register('userName')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.userName?.message!}
                                                isShow={errors.userName?.message! ? true : false}
                                          />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                Vai tr??: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <Controller
                                                name="roleID"
                                                rules={{ required: true }}
                                                control={control}
                                                render={({ field: { value = '', onChange } }) => (
                                                      <div className={cx('select')}>
                                                            <CustomizeSelect
                                                                  defaultValue={value}
                                                                  options={[
                                                                        { label: 'Ch???n vai tr??', value: '' },
                                                                        ...optionRole,
                                                                  ]}
                                                                  onChange={onChange}
                                                            />
                                                      </div>
                                                )}
                                          />
                                          <ErrorMessage
                                                title={errors.roleID?.message!}
                                                isShow={errors.roleID?.message! ? true : false}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                M???t kh???u: <span style={{ color: 'red' }}>*</span>{' '}
                                          </label>
                                          <br />
                                          <input {...register('password')} className={cx('input')} type="text" />
                                          <ErrorMessage
                                                title={errors.password?.message!}
                                                isShow={errors.password?.message! ? true : false}
                                          />
                                    </div>
                              </div>
                              <span style={{ color: 'red' }}>* </span>
                              <span style={{ color: 'var(--color-text-stroke-2)', fontSize: '12px' }}>
                                    L?? nh???ng tr?????ng th??ng tin b???t bu???c
                              </span>
                              <div className={cx('buttons')}>
                                    <CustomizeButton
                                          title="H???y"
                                          type="button"
                                          typeUI="outline"
                                          onClick={() => navigate(-1)}
                                    />
                                    <CustomizeButton title="L??u" type="submit" typeUI="primary" />
                              </div>
                        </form>
                  </div>
            </>
      );
};

export default AddUser;
