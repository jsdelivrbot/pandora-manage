/*global define*/
define({
  appName: 'Identify3D Admin App',
  defaultRoutePath: '/',
  version: "0.1.0",
  debug: true,
  apiEndpoint: 'http://staging2.identify3d.net:3535/', // http://demo2.identify3d.com:3535/
  apiFunctions: {
    // dashboard: {uri: "api/dashboard" },
    login: {uri: "api/login/login" },
    ping: {uri: "api/ping" },
    stats: {uri: "api/dashboard" },
    orders: {uri: "api/orders/order" },
    devices: {uri: "api/devices/device" },
    report: {uri: "api/report" },
    users: {uri: "api/login/users" },
    userDelete: {uri: "api/login/delete" },
    userUpdate: {uri: "api/login/edit" },
    register: {uri: "api/login/register" },
  }
});
