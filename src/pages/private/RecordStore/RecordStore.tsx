import classNames from 'classnames/bind';
import style from './RecordStore.module.scss';
import CustomizeSelect from '../../../components/CustomizeSelect/CustomizeSelect';
import { HeaderContent } from '../../../components/HeaderContent/HeaderContent';
import { translate } from '../../../translate';
import { LogoViewTable } from '../../../assets/svg/LogoViewTable';
import { LogoViewCard } from '../../../assets/svg/LogoViewCard';
import { CustomizeActionLink, ButtonType } from '../../../components/LinkActions/LinkActions';
import { LogoEdit } from '../../../assets/svg/LogoEdit';
import { isOpenSidebar } from '../../../constant';
const cx = classNames.bind(style);

const RecordStore = () => {
      const listOption = [
            {
                  title: 'Thể loại',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'pop', label: 'Pop' },
                        { value: 'edm', label: 'EDM' },
                        { value: 'ballad', label: 'Ballad' },
                  ],
            },
            {
                  title: 'Định dạng',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'music', label: 'Music' },
                        { value: 'video', label: 'Video' },
                  ],
            },
            {
                  title: 'Thời hạn sử dụng',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'valid', label: 'Còn thời hạn' },
                        { value: 'invalid', label: 'Hết thời hạn' },
                  ],
            },
            {
                  title: 'Trạng thái',
                  options: [
                        { value: 'all', label: 'Tất cả' },
                        { value: 'user', label: 'Duyệt bởi người dùng' },
                        { value: 'automatic', label: 'Duyệt tự động' },
                  ],
            },
      ];
      return (
            <div>
                  <HeaderContent title={translate.recordStore} />
                  <input type="text" className={cx('search')} placeholder="Tên bản ghi, ca sĩ..." />

                  <div className={cx('content')}>
                        <div style={{ width: 'var(--width-table-content)' }}>
                              <div className={cx('listSelect', !isOpenSidebar() && 'sidebarClose')}>
                                    {listOption.map((option, index) => {
                                          return (
                                                <div key={index} className={cx('select')}>
                                                      <span className={cx('title')}>{option.title}</span>
                                                      <CustomizeSelect options={option.options} />
                                                </div>
                                          );
                                    })}
                                    <div className={cx('view')}>
                                          <LogoViewTable />
                                          <LogoViewCard />
                                    </div>
                              </div>
                        </div>
                        <CustomizeActionLink
                              type="single"
                              actions={{
                                    logo: <LogoEdit />,
                                    title: 'Quản lý phê duyệt',
                                    type: 'button',
                                    onClick: () => alert('123'),
                              }}
                        />
                  </div>
            </div>
      );
};

export default RecordStore;
