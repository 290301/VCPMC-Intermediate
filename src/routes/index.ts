// public page
import LoginPage from '../pages/public/LoginPage/LoginPage';
import ForgetPassword from '../pages/public/ForgetPassword/ForgetPassword';
import ResetPassword from '../pages/public/ResetPassword/ResetPassword';

// private page
// private page => Quản lý
import Administer from '../pages/private/Administer';
import AuthorizedEntities from '../pages/private/Administer/AuthorizedEntities/AuthorizedEntities';
import ContractManagement from '../pages/private/Administer/Contract/ContractManagement';
import DeviceManagement from '../pages/private/Administer/Device/DeviceManagement';

// private page => Thông tin cá nhân người dùng hiện tại

// private page => Playlist
import Playlist from '../pages/private/Playlist/Playlist';

// private page => Lên lịch phát
import PlayScheduling from '../pages/private/PlayScheduling/PlayScheduling';

// private page => Kho bản ghi
import RecordStore from '../pages/private/RecordStore/RecordStore';

import { routesConfig } from './routeConfig';
import { InfoUser } from '../pages/private/InfoUser/InfoUser';

export type RouteProps = {
      path: string;
      component: () => JSX.Element;
      layout?: any;
      translate?: string;
      pageHeader: string;
};

const privateRoutes: RouteProps[] = [
      // Kho bản ghi
      {
            path: routesConfig.recordStore,
            component: RecordStore,
            translate: 'Kho bản ghi',
            pageHeader: routesConfig.recordStore,
      },

      // Playlist
      {
            path: routesConfig.playList,
            component: Playlist,
            translate: 'Playlist',
            pageHeader: routesConfig.playList,
      },

      // Lên lịch phát
      {
            path: routesConfig.playScheduling,
            component: PlayScheduling,
            translate: 'Lên lịch phát',
            pageHeader: routesConfig.playScheduling,
      },

      // Quản lý
      {
            path: routesConfig.administer,
            component: Administer,
            translate: 'Quản lý',
            pageHeader: routesConfig.administer,
      },
      // Quản lý => Quản lý hợp đồng
      {
            path: routesConfig.contractManagement,
            component: ContractManagement,
            translate: 'Quản lý hợp đồng',
            pageHeader: routesConfig.contractManagement,
      },
      // Quản lý => Quản lý thiết bị
      {
            path: routesConfig.deviceManagement,
            component: DeviceManagement,
            translate: 'Quản lý thiết bị',
            pageHeader: routesConfig.deviceManagement,
      },
      // Quản lý => Đơn vị ủy quyền
      {
            path: routesConfig.authorizedEntities,
            component: AuthorizedEntities,
            translate: 'Đơn vị ủy quyền',
            pageHeader: routesConfig.authorizedEntities,
      },

      // Doanh thu
      {
            path: routesConfig.revenue,
            component: RecordStore,
            translate: 'Doanh thu',
            pageHeader: routesConfig.revenue,
      },

      // Cài đặt
      {
            path: routesConfig.settings,
            component: RecordStore,
            translate: 'Cài đặt',
            pageHeader: routesConfig.settings,
      },

      // Hỗ trợ
      {
            path: routesConfig.support,
            component: RecordStore,
            translate: 'Hỗ trợ',
            pageHeader: routesConfig.support,
      },

      // Thông tin người dùng hiện tại
      {
            path: routesConfig.infoUser,
            component: InfoUser,
            // translate: 'Thông tin cá nhân',
            pageHeader: routesConfig.infoUser,
      },
];

const publicRoutes: RouteProps[] = [
      {
            path: routesConfig.login,
            component: LoginPage,
            translate: 'Đăng nhập',
            pageHeader: routesConfig.login,
      },
      {
            path: routesConfig.forgetPassword,
            component: ForgetPassword,
            translate: 'Quên mật khẩu',
            pageHeader: routesConfig.forgetPassword,
      },
      {
            path: routesConfig.resetPassword,
            component: ResetPassword,
            translate: 'Đặt lại mật khẩu',
            pageHeader: routesConfig.resetPassword,
      },
];

export { publicRoutes, privateRoutes };
