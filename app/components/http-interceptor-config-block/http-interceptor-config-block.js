/*global define*/
'use strict';

define([], function () {

  function HttpInterceptorConfigBlock($httpProvider) {

    // var a = Bacon.sequentially(10, [1, 2])
    // var b = a.map(function (x) { return x * 2})
    // var c = Bacon.combineAsArray([a, b])
    // c.log()

    // return;

    // $httpProvider.responseInterceptors.push('fourZeroOneInterceptorService');

    $httpProvider.interceptors.push('authInterceptorService');

    // $httpProvider.interceptors.push('errorInterceptorService');

  }

  return ['$httpProvider', HttpInterceptorConfigBlock];
});
