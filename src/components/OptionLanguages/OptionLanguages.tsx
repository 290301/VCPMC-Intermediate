import './OptionLanguages.css';
import { Select } from 'antd';
import { LogoVietNam } from '../../assets/svg/LogoVietNam';
import { LogoApp } from '../../assets/svg/LogoApp';
import CustomizeSelect from '../CustomizeSelect/CustomizeSelect';

type NoName = {
      style?: any;
};
const OptionLanguages = ({ style }: NoName) => {
      const options = [
            {
                  label: (
                        <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
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
                        </span>
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
            <CustomizeSelect
                  defaultValue="vi"
                  options={options}
                  borderWhite={true}
                  style={{
                        width: 150,
                        backgroundColor: 'transparent',
                        borderColor: 'white',
                  }}
            />
      );
};
export default OptionLanguages;
