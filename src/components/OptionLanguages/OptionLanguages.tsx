import './OptionLanguages.css';
import { Select } from 'antd';
import { LogoVietNam } from '../../assets/svg/LogoVietNam';
import { LogoApp } from '../../assets/svg/LogoApp';

type NoName = {
      style?: any;
};
const OptionLanguages = ({ style }: NoName) => {
      const options = [
            {
                  label: (
                        <p style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                              <span> Tiếng việt </span>
                              <LogoVietNam
                                    style={{
                                          width: '20px',
                                          height: '20px',
                                          borderRadius: '50%',
                                          overFlow: 'hidden',
                                          marginLeft: '12px',
                                    }}
                              />
                        </p>
                  ),
                  value: 'vi',
            },
            {
                  label: (
                        <p style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                              <span> Tiếng anh </span>
                              <LogoApp
                                    style={{
                                          width: '20px',
                                          height: '20px',
                                          borderRadius: '50%',
                                          overFlow: 'hidden',
                                          marginLeft: '12px',
                                    }}
                              />
                        </p>
                  ),
                  value: 'en',
            },
      ];
      const handleChange = (value: string) => {
            console.log(`selected ${value}`);
      };
      return (
            <Select
                  className="selectLanguages"
                  defaultValue="vi"
                  options={options}
                  style={{
                        width: 150,
                        backgroundColor: 'transparent',
                        ...style,
                  }}
                  onChange={handleChange}
            />
      );
};
export default OptionLanguages;
