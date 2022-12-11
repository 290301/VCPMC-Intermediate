import classNames from 'classnames/bind';
import style from './ResetPassword.module.scss';
import { LogoApp } from '../../../assets/svg/LogoApp';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { useState } from 'react';

const cx = classNames.bind(style);
const ResetPassword = () => {
      const [error, setError] = useState<{ isError: boolean; messError: string }>({ isError: false, messError: '' });
      const [dataInput, setDataInput] = useState({ password: '', confirmPassword: '' });
      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDataInput({ ...dataInput, [e.target.name]: e.target.value });
      };
      const handleConfirm = () => {
            if (dataInput.password.length === 0 || dataInput.confirmPassword.length === 0) {
                  setError({ isError: true, messError: 'Vui lòng điền đầy đủ thông tin' });
            } else {
                  console.log('username: ' + dataInput.password + 'password: ' + dataInput.confirmPassword);
                  setError({ isError: false, messError: '' });
            }
      };
      return (
            <div className={cx('wrapperResetPassword')}>
                  <LogoApp />
                  <h2 className={cx('title')}>Đặt lại mật khẩu</h2>
                  <form>
                        <label htmlFor="password" className={cx('label')}>
                              Mật khẩu mới
                        </label>
                        <input
                              value={dataInput.password}
                              onChange={handleChangeInput}
                              aria-label="password"
                              name="password"
                              className={cx('input', error.isError && 'showError')}
                              type="password"
                        />
                        <br />
                        <br />
                        <label htmlFor="confirmPassword" className={cx('label')}>
                              Nhập lại mật khẩu mới
                        </label>
                        <input
                              value={dataInput.confirmPassword}
                              name="confirmPassword"
                              onChange={handleChangeInput}
                              aria-label="confirmPassword"
                              className={cx('input', error.isError && 'showError')}
                              type="password"
                        />
                        <br />

                        <p className={cx('errorMessage', error.isError && 'show')}>
                              {error.isError && error.messError}
                        </p>
                  </form>
                  <CustomizeButton
                        typeUI="primary"
                        type="submit"
                        title="Lưu mật khẩu"
                        onClick={handleConfirm}
                        style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
                  />
            </div>
      );
};

export default ResetPassword;
