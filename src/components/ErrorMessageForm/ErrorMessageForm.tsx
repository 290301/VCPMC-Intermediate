import classNames from 'classnames/bind';
import style from './ErrorMessageForm.module.scss';
const cx = classNames.bind(style);

type ErrorMessageType = {
      title: string;
      isShow?: boolean;
};
const ErrorMessage = ({ title, isShow }: ErrorMessageType) => {
      return <span className={cx('errorMessage', isShow && 'show')}>{title}</span>;
};

export default ErrorMessage;
