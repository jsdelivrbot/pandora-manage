/*global define*/
define({
  appName: 'Identify3D Admin App',
  defaultRoutePath: '/',
  version: "0.1.0",
  debug: true,
  apiEndpoint: '', // http://demo1.identify3d.net:3030/
  apiFunctions: {
    login: {uri: "http://demo2.identify3d.com:3501/api/login" },
    ping: {uri: "http://demo2.identify3d.com:3501/api/ping" },
    stats: {uri: "http://demo1.identify3d.net:3030/api/devices" },
    orders: {uri: "http://demo2.identify3d.com:3501/api/orders/order" },
    devices: {uri: "http://demo1.identify3d.net:3030/api/devices" },
    report: {uri: "http://demo1.identify3d.net:3030/api/report" },
  }
});
