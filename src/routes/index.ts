import { translate } from './../translate/index';
// public page
import LoginPage from '../pages/public/LoginPage/LoginPage';
import ForgetPassword from '../pages/public/ForgetPassword/ForgetPassword';
import ResetPassword from '../pages/public/ResetPassword/ResetPassword';

// private page => Quản lý
import Administer from '../pages/private/Administer';
import AuthorizedEntities from '../pages/private/Administer/AuthorizedEntities/AuthorizedEntities';
import ContractManagement from '../pages/private/Administer/Contract/ContractManagement';
import DeviceManagement from '../pages/private/Administer/Device/DeviceManagement';

// private page => Thông tin cá nhân người dùng hiện tại
import { InfoUser } from '../pages/private/InfoUser/InfoUser';

// private page => Playlist
import Playlist from '../pages/private/Playlist/Playlist';

// private page => Lên lịch phát
import PlayScheduling from '../pages/private/PlayScheduling/PlayScheduling';

// private page => Kho bản ghi
import RecordStore from '../pages/private/RecordStore/RecordStore';

// private page => Doanh thu
import Revenue from '../pages/private/Revenue';
import RevenueReport from '../pages/private/Revenue/RevenueReport/RevenueReport';
import History from '../pages/private/Revenue/History/History';
import RevenueDistribution from '../pages/private/Revenue/RevenueDistribution/RevenueDistribution';

import { routesConfig } from './routeConfig';

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
            translate: translate.recordStore,
            pageHeader: routesConfig.recordStore,
      },

      // Playlist
      {
            path: routesConfig.playList,
            component: Playlist,
            translate: translate.playList,
            pageHeader: routesConfig.playList,
      },

      // Lên lịch phát
      {
            path: routesConfig.playScheduling,
            component: PlayScheduling,
            translate: translate.playScheduling,
            pageHeader: routesConfig.playScheduling,
      },

      // Quản lý
      {
            path: routesConfig.administer,
            component: Administer,
            translate: translate.administer,
            pageHeader: routesConfig.administer,
      },
      // Quản lý => Quản lý hợp đồng
      {
            path: routesConfig.contractManagement,
            component: ContractManagement,
            translate: translate.contractManagement,
            pageHeader: routesConfig.contractManagement,
      },
      // Quản lý => Quản lý thiết bị
      {
            path: routesConfig.deviceManagement,
            component: DeviceManagement,
            translate: translate.deviceManagement,
            pageHeader: routesConfig.deviceManagement,
      },
      // Quản lý => Đơn vị ủy quyền
      {
            path: routesConfig.authorizedEntities,
            component: AuthorizedEntities,
            translate: translate.authorizedEntities,
            pageHeader: routesConfig.authorizedEntities,
      },

      // Doanh thu
      {
            path: routesConfig.revenue,
            component: Revenue,
            translate: translate.revenue,
            pageHeader: routesConfig.revenue,
      },
      // Doanh thu => Báo cáo doanh thu
      {
            path: routesConfig.revenueReport,
            component: RevenueReport,
            translate: translate.revenueReport,
            pageHeader: routesConfig.revenueReport,
      },
      // Doanh thu => Lịch sử đối soát
      {
            path: routesConfig.history,
            component: History,
            translate: translate.history,
            pageHeader: routesConfig.history,
      },
      // Doanh thu => Phân phối doanh thu
      {
            path: routesConfig.revenueDistribution,
            component: RevenueDistribution,
            translate: translate.revenueDistribution,
            pageHeader: routesConfig.revenueDistribution,
      },

      // ---------------------------------- chưa translate từ đây

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
            translate: translate.infoUser,
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
