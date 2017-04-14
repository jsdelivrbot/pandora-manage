/*global define*/
'use strict';

define([], function () {

  function errorInterceptorFactory($q, $cacheFactory, $timeout, $rootScope, $injector, $document) {

    return {
      'request': function(config) {
        return config;
      },
      'response': function(response) {
        return response;
      },
      'responseError': function(response,k,j,h) {

        var mockresponse = {
          "_invalid_user": { fields: ["email", "password", "xxxx"] },
          "_not_found": ["email"]
        };

        // we can access the scope but we need to somehow know
        // target form name; that means we need the send the
        // server the source form and have it target that from
        // in response
        var scope = angular.element($document[0].forms['Lform']).scope();

        scope['Lform'].submissionErrors = {
          errors: mockresponse,
          bust: new Date().getTime()
        }

        return $q.reject(response);
      }

    }

  }

  return {'errorInterceptorService': ['$q', '$cacheFactory', '$timeout', '$rootScope', '$injector', '$document', errorInterceptorFactory]};
});
