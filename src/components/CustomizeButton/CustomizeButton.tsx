import { Spin } from 'antd';
import classNames from 'classnames/bind';
import style from './CustomizeButton.module.scss';
const cx = classNames.bind(style);

type ButtonProps = {
      typeUI: 'primary' | 'secondary' | 'outline';
      type: 'button' | 'submit' | 'reset';
      title: string;
      style?: any;
      isLoading?: boolean;
      onClick?: () => void;
};
const CustomizeButton = ({ type, typeUI, title, style, isLoading = false, onClick }: ButtonProps) => {
      return (
            <button
                  type={type}
                  className={cx(
                        'btn',
                        typeUI === 'primary' && 'btn-primary',
                        typeUI === 'secondary' && 'btn-secondary',
                        typeUI === 'outline' && 'btn-outline',
                  )}
                  onClick={onClick}
                  style={style}
            >
                  {isLoading ? <Spin /> : title}
            </button>
      );
};
export default CustomizeButton;
