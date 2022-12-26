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
                  .required('Vui lòng điền vào trường này')
                  .test('validDate', 'Ngày hết hạn phải lớn hơn ngày hiện tại', (value, index) => {
                        console.log(value, index.parent);
                        return true;
                  }),
            isActive: yup.boolean().notRequired(),
            phone: yup
                  .string()
                  .required('Vui lòng điền vào trường này')
                  .phone('VN', true, 'Vui lòng nhập đúng định dạng số điện thoại'),
            email: yup.string().notRequired().email('Vui lòng điền đúng định dạng email'),
            image: yup.string().notRequired(),
            dateOfBirth: yup.number().notRequired(),
            firstName: yup.string().required('Vui lòng điền vào trường này'),
            lastName: yup.string().required('Vui lòng điền vào trường này'),
            roleID: yup.string().trim().required('Vui lòng điền vào trường này'),
            userName: yup.string().trim().required('Vui lòng điền vào trường này'),
            password: yup.string().trim().required('Vui lòng điền vào trường này'),
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
                  <HeaderContent title="Thêm người dùng mới" />
                  <div className={cx('wrapper')}>
                        <form className={cx('form-control')} onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>
                                                Họ: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                Tên: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                Số điện thoại: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                Ngày hết hạn: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                Tên đăng nhập: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                Vai trò: <span style={{ color: 'red' }}>*</span>{' '}
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
                                                                        { label: 'Chọn vai trò', value: '' },
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
                                                Mật khẩu: <span style={{ color: 'red' }}>*</span>{' '}
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
                                    Là những trường thông tin bắt buộc
                              </span>
                              <div className={cx('buttons')}>
                                    <CustomizeButton
                                          title="Hủy"
                                          type="button"
                                          typeUI="outline"
                                          onClick={() => navigate(-1)}
                                    />
                                    <CustomizeButton title="Lưu" type="submit" typeUI="primary" />
                              </div>
                        </form>
                  </div>
            </>
      );
};

export default AddUser;
