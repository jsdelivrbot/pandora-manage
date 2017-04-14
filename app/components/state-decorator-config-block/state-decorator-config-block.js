/*global define*/
'use strict';

define([], function () {

  function StateDecoratorConfigBlock($provide, $controllerProvider, $animateProvider, $filterProvider, $compileProvider, $stateProvider) {

    return;

    // TODO: Split app into modules, Identify3D, frontpageModule, adminModule
    // When angular navigates to a route, the router should take care of loading the dependency module?
    // we alsmost alway want to lazy load a whole angular module instead of controller, directive etc which are too tiny and
    // not worty lazy loading!

    var loader = {
      '$provide': {
        'provider': $provide.provider,
        'factory': $provide.factory,
        'service': $provide.service,
        'value': $provide.value,
        'constant': $provide.constant
      },
      '$animateProvider': {
        'register': $animateProvider.register
      },
      '$filterProvider': {
        'register': $filterProvider.register
      },
      '$controllerProvider': {
        'register': $controllerProvider.register
      },
      '$compileprovider': {
        'directive': $compileProvider.directive
      },
      // TODO: runblocks and configs depend on the injector afaik
      // github:marcoslin
      '$injector': {
        'invoke': noop
      }
    }

    var isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    noop = angular.noop;

    function prepareResolve(){

      // TODO: create a global cache of fullfilled modules, so that siblings dont
      // doulbe load each others ngRequires, and same child doesn't dobule load itself
      // when navigated away and to
      var enqueuedModules = [];

      return function generateResolve(promisedModules) {

        return { 'ngRequire': ['$q', '$state', function($q, $state) {

          // console.log("\n\ncalled", who);

          var filteredModules = filterFulfilled(promisedModules, enqueuedModules);

          var deferred = $q.defer();

          //console.log("###@angularjs/accounts", require.specified("angularjs/accounts") );
          //console.log("###@larjs/accounts", require.defined("angularjs/accounts") );

          enqueuedModules = enqueuedModules.concat(filteredModules);

          // this is async!: that means while requirejs is
          // loading the modules angular might try to resolve
          // for same modules as soon as this fn returns, to
          // avoid double registering of angular modules we we
          // enque everything before returning control to the
          // event loop
          //console.log("promisedModules",promisedModules);
          //console.log("filteredModules",filteredModules);
          using(filteredModules, function( /* modules */ ){

            forEach(arguments, function(module) {
              var invokeQueue = module.module._invokeQueue;

              // console.log("invokeQueue:::@@#$#@$", module.module);

              forEach(invokeQueue, function(item){
                // console.log(item);

                var provider = item[0];
                var method = item[1];
                var args = item[2];
                var obj = args[0];

                loader[provider][method](obj);
                // loader[provider][method].apply(null,obj);

              });

            });
            // console.log(who);
            // console.log("using returned\n\n");
            deferred.resolve();
          })

          // TODO: if nested views render in absolute views and
          // don't have to wait for each other to render, then this will
          // resolve the promise before the parent had a chance to
          // load the required scripts and crash. We can try to
          // inject ngRequre into ngRequire above to emulate a
          // circular dependency and that might help with that, but
          // then it's waste of resources for those of routes that
          // are nested within each others <view>s. So maybe we
          // should create a configuration option for this.
          // We need to create a reproducible bug to iterate on this
          // feature, cuz it seems to be working somehow tho
          // console.log("RETURN OF PROMISE\n\n");
          return deferred.promise;
        }] };
      }
    }

    function filterFulfilled(promisedModules, fulfilledModules){

      var filteredModules = [];

      forEach(promisedModules, function(promise){
        if(fulfilledModules.indexOf(promise) < 0){
          filteredModules.push(promise);
        }
      });

      return filteredModules;
    }

    var generateResolve = prepareResolve();

    // TODO: make sure this works for every way we can declare a view in
    // ui- router  as there are more than one
    $stateProvider.decorator('views', function (state, views) {

      var v = {},
      views = views(state);

      // global/state level require
      var stateRequire = state.ngRequire && isArray(state.ngRequire) ? state.ngRequire : [];

      if(stateRequire.length > 0){
        state.resolve = extend(state.resolve || {}, generateResolve(stateRequire));
      }

      forEach(views, function(config, name) {
        // view level require
        var viewRequire = config.ngRequire && isArray(config.ngRequire) ? config.ngRequire : [];

        // TODO: We should not use viewRequire! ui-router docs is
        // against it and inheritance rules don't seem to apply to
        // view.resolve. We need inheritance to work so that we can
        // filter out fulfilled promises of parent states to avoid
        // double registering of module items
        if(viewRequire.length > 0) {
          config.resolve = extend(config.resolve || {}, generateResolve(viewRequire));
        }

        v[name] = config;
      });

      // TODO: how do we lazy load partial views?
      // TODO: lazy loading of config and run blocks from lazy loaded modules

      return v;
    })

  }

  return ['$provide', '$controllerProvider', '$animateProvider', '$filterProvider', '$compileProvider', '$stateProvider', StateDecoratorConfigBlock];
});
