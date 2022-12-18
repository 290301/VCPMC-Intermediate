export const routesConfig = {
      // public route
      login: '/',
      forgetPassword: '/forgetPassword',
      resetPassword: '/resetPassword',

      // private route

      // Kho bản ghi
      recordStore: '/recordStore',
      updateRecord: '/recordStore/updateRecord/:id',
      // Playlist
      playList: '/playList',
      addPlayList: '/playList/addPlayList',
      addRecordToPlaylist: '/playList/addRecordToPlaylist',

      // Lập lịch phát
      playScheduling: '/playScheduling',

      // Quản lý
      administer: '/administer',
      contractManagement: '/administer/contractManagement',
      deviceManagement: '/administer/deviceManagement',
      authorizedEntities: '/administer/authorizedEntities',

      // Doanh thu
      revenue: '/revenue',
      revenueReport: '/revenue/revenueReport',
      revenueDistribution: '/revenue/revenueDistribution',
      history: '/revenue/history',

      // Cài đặt
      settings: '/settings',

      // Hỗ trợ
      support: '/support',

      // Thông tin người dùng hiện tại
      infoUser: '/infoUser',
};
