import './CustomizeSelect.css';
import { Select } from 'antd';
type SelectProps = {
      style?: React.CSSProperties | undefined;
      options: { value: string; label: JSX.Element | string }[];
      defaultValue?: string;

      //   Special :)))
      borderWhite?: boolean;
};

const CustomizeSelect = ({ style, options, defaultValue = 'all', borderWhite }: SelectProps) => {
      return (
            <Select
                  popupClassName="selectPopup"
                  className={borderWhite ? 'borderWhite' : ''}
                  style={style}
                  defaultValue={options[0].value}
            >
                  {options.map((option, index) => {
                        return (
                              <Select.Option key={index} value={option.value}>
                                    {option.label}
                              </Select.Option>
                        );
                  })}
            </Select>
      );
};
export default CustomizeSelect;
