/*global define*/
'use strict';

define([], function () {

  function stateBufferFactory($injector) {

    return;

    var buff = [],
    shouldRedirect = false,
    state;

    return {
      append: function(state, params) {

        buff.push({
          state: state,
          params: params
        })

        if(buff.length > 2) {
          buff = buff.splice(-2);
        }
      },
      currentState: function(){
        var len = buff.length;

        if(len > 0){
          return buff[len-1].state;
        }

        return null;
      },
      setRedirect: function(){
        shouldRedirect = true;
      },
      shouldRedirect: function(){
        return shouldRedirect;
      },
      redirect: function() {

        state = state || $injector.get('$state');

        var prev = buff[0],
        prevState = prev.state,
        prevParams = prev.params;

        shouldRedirect = false;

        // reload so that the currentUser re-resolves in root state
        state.go(prevState, prevParams, { reload: true, location:'replace' }); //
        // $location.url(prevUrl, prevUrl);
      }
    }

  }

  return {'stateBufferService': ['$injector', stateBufferFactory]};
});
