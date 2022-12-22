import classNames from 'classnames/bind';
import style from './ForgetPassword.module.scss';
import { LogoApp } from '../../../assets/svg/LogoApp';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';
import emailjs from '@emailjs/browser';
const cx = classNames.bind(style);

const ForgetPassword = () => {
      const [error, setError] = useState<{ isError: boolean; messError: string }>({ isError: false, messError: '' });
      const [email, setEmail] = useState<string>('');
      const [statusSend, setStatusSend] = useState<'default' | 'sent' | 'error'>('default');

      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
      };
      const handleConfirm = () => {
            if (email.length === 0) {
                  setError({ isError: true, messError: 'Vui lòng điền đầy đủ thông tin' });
            } else {
                  emailjs
                        .send('service_wkchfxr', 'service_wkchfxr', {}, 'yyPIWt3lMViyJPmq4')
                        .then((result) => {
                              console.log(result.text);
                        })
                        .catch((error) => {
                              console.log(error);
                        });
                  console.log(email);
                  setError({ isError: false, messError: '' });
            }
      };
      return (
            <div className={cx('wrapperForgetPassword')}>
                  <LogoApp width="200px" height="200px" />
                  <div style={statusSend === 'default' ? { display: 'block' } : { display: 'none' }}>
                        <h2 className={cx('title')}>Khôi phục mật khẩu</h2>
                        <p className={cx('text')}>
                              Vui lòng nhập địa chỉ email đã đăng ký để yêu cầu khôi phục mật khẩu
                        </p>
                        <form>
                              <label htmlFor="email" className={cx('label')}>
                                    Email
                              </label>
                              <input
                                    value={email}
                                    onChange={handleChangeInput}
                                    aria-label="email"
                                    name="email"
                                    className={cx('input', error.isError && 'showError')}
                                    type="email"
                              />

                              <p className={cx('errorMessage', error.isError && 'show')}>
                                    {error.isError && error.messError}
                              </p>
                        </form>
                        <CustomizeButton
                              typeUI="primary"
                              type="submit"
                              title="Xác nhận"
                              onClick={handleConfirm}
                              style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
                        />
                  </div>
                  <div style={statusSend === 'sent' ? { display: 'block' } : { display: 'none' }}>
                        <h2 className={cx('title')}>Khôi phục mật khẩu</h2>
                        <p className={cx('text')}>
                              Link khôi phục mật khẩu đã được gửi vào mail của bạn. Vui lòng kiểm tra mail.
                        </p>
                        <p className={cx('text')}>
                              Click vào đường link được đính kèm trong mail để chuyển đến trang đặt lại mật khẩu.
                        </p>
                  </div>
                  <div style={statusSend === 'error' ? { display: 'block' } : { display: 'none' }}>
                        <h2 className={cx('title')} style={{ color: 'var(--color-red)' }}>
                              Không thể kết nối
                        </h2>
                        <p className={cx('text')}>Dường như đã có chút trục trặc hoặc link này đã hết hạn</p>
                        <p className={cx('text')}>
                              Vui lòng thử lại hoặc yêu cầu gửi lại link để đặt lại mật khẩu của bạn.
                        </p>
                        <CustomizeButton
                              title="Yêu cầu gửi lại link"
                              type="button"
                              typeUI="outline"
                              style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
                        />
                  </div>
                  <Link to={routesConfig.login} className={cx('login')}>
                        Quay lại đăng nhập
                  </Link>
            </div>
      );
};

export default ForgetPassword;
