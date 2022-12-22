import classNames from 'classnames/bind';
import style from './AddUser.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContent } from '../../../../../components/HeaderContent/HeaderContent';
import { toggleSidebar } from '../../../../../redux/Slice/Sidebar';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserType } from '../../../../../types/User';
import CustomizeButton from '../../../../../components/CustomizeButton/CustomizeButton';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import CustomizeSelect from '../../../../../components/CustomizeSelect/CustomizeSelect';
import { RootState } from '../../../../../redux/store';
import { RoleType } from '../../../../../types/Role';
import { DefaultOptionType } from 'antd/es/select';
const cx = classNames.bind(style);

const AddUser = () => {
      const dispatch = useDispatch<any>();
      const dataRole = useSelector((state: RootState) => state.role.data);
      useEffect(() => {
            dispatch(toggleSidebar({ type: 'fixed', isOpen: false }));
      }, []);

      // const optionRole: { value: string; label: JSX.Element | string }[] = dataRole.map((role:RoleType) => return <span>Hello</span>);
      const optionRole: { value: string; label: JSX.Element | string }[] = dataRole.map((role: RoleType) => {
            return {
                  value: role.roleID,
                  label: <span key={role.roleID}>{role.roleName}</span>,
            };
      });
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
            resolver: yupResolver(schemaUser),
      });
      const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
            try {
                  console.log(data);
            } catch (error) {
                  console.log(error);
            }
      };
      const handleChangeSelect = (value: string, option: DefaultOptionType | DefaultOptionType[]) => {
            console.log(option);
      };
      return (
            <>
                  <HeaderContent title="Thêm người dùng mới" />
                  <div className={cx('wrapper')}>
                        <form className={cx('form-control')} onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Họ:</label>
                                          <br />
                                          <input {...register('lastName')} className={cx('input')} type="text" />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Tên:</label>
                                          <br />
                                          <input {...register('firstName')} className={cx('input')} type="text" />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Email:</label>
                                          <br />
                                          <input {...register('email')} className={cx('input')} type="text" />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Số điện thoại:</label>
                                          <br />
                                          <input {...register('phone')} className={cx('input')} type="text" />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Ngày hết hạn:</label>
                                          <br />
                                          <Controller
                                                name="dateOfBirth"
                                                rules={{ required: true }}
                                                control={control}
                                                render={({ field }) => (
                                                      <DatePicker format="DD/MM/YYYY" className={cx('input')} />
                                                )}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Tên đăng nhập:</label>
                                          <br />
                                          <input {...register('userName')} className={cx('input')} type="text" />
                                    </div>
                              </div>
                              <div className={cx('form-group')}>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Vai trò:</label>
                                          <br />
                                          <Controller
                                                name="dateOfBirth"
                                                rules={{ required: true }}
                                                control={control}
                                                render={({ field }) => (
                                                      <div className={cx('select')}>
                                                            <CustomizeSelect
                                                                  options={optionRole}
                                                                  onChange={handleChangeSelect}
                                                            />
                                                      </div>
                                                )}
                                          />
                                    </div>
                                    <div className={cx('form-item')}>
                                          <label className={cx('label')}>Mật khẩu:</label>
                                          <br />
                                          <input {...register('password')} className={cx('input')} type="text" />
                                    </div>
                              </div>

                              <div className={cx('buttons')}>
                                    <CustomizeButton title="Hủy" type="button" typeUI="outline" />
                                    <CustomizeButton title="Lưu" type="submit" typeUI="primary" />
                              </div>
                        </form>
                  </div>
            </>
      );
};

export default AddUser;
