/*global define*/
'use strict';

define([], function () {

  function StateEventsRunBlock($rootScope, $state, $stateParams, $location, $interval, stateBufferService, Identify3D, $q, $urlRouter) {

    return;

    // $rootScope.$state = $state;
    // $rootScope.$stateParams = $stateParams;

    // $interval(function(){
    // 		document.activeElement.blur()
    // 		console.log(document.activeElement)
    // }, 1000)

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      console.log("> $stateChangeStart", toState)
      //e.preventDefault();
      // previousLocation = $location.path();
      // console.log("#######$$$#####",stateBuffer.shouldRedirect(), toState, toParams, "##");
      stateBufferService.append(toState, toParams);
      // previousStateName = $state.current.name;
      // console.log("previousLocation=",previousLocation, $state.current, toState);

      var currentState = stateBuffer.currentState();
      console.log("> currentState ", currentState);


      if(currentState && currentState.name.indexOf("account") == -1) {
        if(Identify3D.hasToken()){
          // TODO: if the token is expired one, this will go into an infinite loop
          console.log("Will prevent above state from rendering and redirect to Account");
          e.preventDefault();
          $state.go(states.accountState, null, { reload: true, location:'replace' }); //, notify:false
        }
      }

    });
    $rootScope.$on('$stateNotFound', function(e, unfoundState, fromState, fromParams) {
      //console.log("> $stateNotFound")
    });
    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
      console.log("> $stateChangeSuccess",toState);
    });
    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
      // console.log(">#@$@#$@#$@ $stateChangeError", e, error)
    });
    $rootScope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
      console.log('$locationChangeStart', evt, absNewUrl, absOldUrl);

      // return false;

      // evt.preventDefault();
      // $urlRouter.sync();

    });
    $rootScope.$on('$locationChangeSuccess',function(evt, absNewUrl, absOldUrl) {
      //console.log('$locationChangeSuccess', evt, absNewUrl, absOldUrl);
    });

    // $urlRouter.listen();

    return;
  }

  return ['$rootScope', '$state', '$stateParams', '$location', '$interval', 'stateBufferService', 'Identify3DObject', '$q', '$urlRouter', StateEventsRunBlock];
});
