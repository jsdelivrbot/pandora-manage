/*global define*/
'use strict';

define([], function () {

    function NotFnRunBlock($rootScope) {

      $rootScope.not = function(cond){ return !cond; }

      return;
    }

    return ['$rootScope', NotFnRunBlock];
});
