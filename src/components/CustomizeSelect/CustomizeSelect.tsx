import './CustomizeSelect.css';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/cascader';
type SelectProps = {
      style?: React.CSSProperties | undefined;
      options: { value: string; label: JSX.Element | string }[];
      defaultValue?: string;
      onChange: ((value: string, option: DefaultOptionType | DefaultOptionType[]) => void) | undefined;
      //   Special :)))
      borderWhite?: boolean;
};

const CustomizeSelect = ({ style, options, defaultValue = 'all', borderWhite, onChange }: SelectProps) => {
      return (
            <Select
                  popupClassName="selectPopup"
                  className={borderWhite ? 'borderWhite' : ''}
                  style={style}
                  defaultValue={options[0].value}
                  onChange={onChange}
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
