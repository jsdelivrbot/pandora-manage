/*global define*/
'use strict';

define([], function () {

  function fourZeroOneInterceptorFactory($location, $q, $injector, $rootScope, stateBufferService) {

    return;

    var success = function(response) {
      return response;
    }

    var error = function(response) {

      authFailures.push(response);

      console.log("Lock status", lock);

      // Failed login attempt call(s) and initial authenticated
      // session detection call also throw 401 HTTP Not
      // Authorized. For ex, interceptor may misinterpret failed
      // login attempts and such as Permission Denied and
      // redirect to loginState. loginRequiredState should
      // display the login errors that comes back with the 401
      // and not redirect to loginState.

      // HTTP NotAuthorized
      if(lock == false && response.status === 401 && !response.config.skiplogsOutUserOn401) {

        // More than one request could be made to server in
        // parallel in that case the first 401 response should
        // handle redirecting the user to /login and rest
        // should fail to avoid multipe redirects - which
        // messes up the stateBufferService since $stateChangeStart
        // is called for each redirect although only one
        // succedes.
        lock = true;
        console.log("Acquiring Lock")
        var releaseLock = function(){ lock = false; console.log("> Releasing lock"); };

        console.log("Redirecting in interceptor for 401");

        state = state || $injector.get('$state');

        // Note-To-Self: There is no way of knowing what the
        // target/initiator state (not $state.current) is.
        // Therefore we can't simply append to stateBufferService
        // here. We'll have to do it in $stateChangeStart on
        // every state change, and setRedirect flag here to
        // trigger a redirect upon successfull login. We have
        // to same exact problem in the resolve of the
        // currentUser in the root state for redirecting
        // authenticated users back to /account from resources
        // such as /login, /signup etc.

        // A delayed response might arrive after we release
        // the lock. We should ignore all further 401s if we
        // are in loginState
        if(!state.is(states.loginState)){

          stateBufferService.setRedirect();
          $injector.get('Identify3DObject').removeToken();

          // reload so that the currentUser re-resolves in root state
          state.go(states.loginState, null, {reload:true, replace:'replace'}).then(releaseLock, releaseLock);
        } else {
          releaseLock();
        }
      } else {
        console.log("No lock needed due to skiplogsOutUserOn401");
      }

      // Note-To-Self: instead of rejecting we could return
      // a promise and complete the promise after user logs
      // in to return.
      // /angular-http-auth
      return $q.reject(response);
    }

    return function(promise) {
      return promise.then(success, error);
    }

  }

  return {'fourZeroOneInterceptorService': ['$location', '$q', '$injector', '$rootScope', 'stateBufferService', fourZeroOneInterceptorFactory]};
});
