import classNames from 'classnames/bind';
import style from './LoginPage.module.scss';
import { LogoApp } from '../../../assets/svg/LogoApp';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { routesConfig } from '../../../routes/routeConfig';
import { Login } from '../../../redux/Slice/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

const LoginPage = () => {
      const [error, setError] = useState<{ isError: boolean; messError: string }>({ isError: false, messError: '' });
      const [dataInput, setDataInput] = useState({ username: '', password: '' });
      const dataUser = useSelector((state: RootState) => state.user);
      const navigate = useNavigate();
      const dispatch = useDispatch<any>();
      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDataInput({ ...dataInput, [e.target.name]: e.target.value });
            setError({ isError: false, messError: '' });
      };
      async function LoginApp() {
            return await dispatch(Login({ userName: dataInput.username, password: dataInput.password }));
      }
      const handleLogin = () => {
            if (dataInput.username.length === 0 || dataInput.password.length === 0) {
                  setError({ isError: true, messError: 'Vui lòng điền đầy đủ thông tin' });
            } else {
                  LoginApp()
                        .then((response) => {
                              // response: {type, payload,meta}
                              if (response?.payload) {
                                    toast.success('Đăng nhập thành công', { theme: 'dark' });
                                    navigate(routesConfig.recordStore);
                              } else {
                                    setError({
                                          isError: true,
                                          messError: 'Tên đăng nhập hoặc mật khẩu không chính xác',
                                    });
                              }
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }
      };
      return (
            <div className={cx('wrapperLogin')}>
                  <LogoApp />
                  <h2 className={cx('title')}>Đăng nhập</h2>
                  <form>
                        <label htmlFor="username" className={cx('label')}>
                              Tên đăng nhập
                        </label>
                        <input
                              value={dataInput.username}
                              onChange={handleChangeInput}
                              aria-label="username"
                              name="username"
                              className={cx('input', error.isError && 'showError')}
                              type="text"
                        />
                        <br />
                        <br />
                        <label htmlFor="password" className={cx('label')}>
                              Mật khẩu
                        </label>
                        <input
                              value={dataInput.password}
                              name="password"
                              onChange={handleChangeInput}
                              aria-label="password"
                              className={cx('input', error.isError && 'showError')}
                              type="password"
                        />
                        <br />

                        <p className={cx('errorMessage', error.isError && 'show')}>
                              {error.isError && error.messError}
                        </p>
                        <input type="checkbox" aria-label="remember" />
                        <label htmlFor="remember" className={cx('rememberAccount')}>
                              Ghi nhớ mật khẩu
                        </label>
                  </form>
                  <CustomizeButton
                        typeUI="primary"
                        type="button"
                        title="Đăng nhập"
                        onClick={handleLogin}
                        isLoading={dataUser.statusRequest === 'pending'}
                        style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
                  />
                  <Link to={routesConfig.forgetPassword} className={cx('forgetPassword')}>
                        Quên mật khẩu?
                  </Link>
            </div>
      );
};

export default LoginPage;
