/*global define, angular*/
'use strict';

define([

	'lodash',
	'settings',

	'angular',
	'angular-ui-router',
	'angular-ui-bootstrap',
	'angular-ui-utils',
	'angular-cookies',
	'angular-touch',

	'angular-slider',
	'ng-slider',
	'angularjs-slider',
	// 'venturocket-angular-slider',

	'angular-aside',
	'angular-idle',
	'angular-busy',
	'angular-file-upload',
	'ng-image-cropper',
	'checklist-model',
	'icheck',
	'angular-chartjs',

	'models/identify3d-object',

	'components/not-fn-run-block/not-fn-run-block',
	// 'components/state-events-run-block/state-events-run-block',

	'components/http-interceptor-config-block/http-interceptor-config-block',
	'components/state-decorator-config-block/state-decorator-config-block',

	'components/session-storage-service/session-storage-service',
	// 'components/state-buffer-service/state-buffer-service',
	'components/auth-interceptor-service/auth-interceptor-service',
	// 'components/error-interceptor-service/error-interceptor-service',
	// 'components/four-zero-one-interceptor-service/four-zero-one-interceptor-service',
	'components/confirmation-dialog-service/confirmation-dialog-service',

	'components/on-enter-directive/on-enter-directive',

	'common/login-controller',
	'common/signup-controller',
	'common/master-controller',
	'common/orders-controller',
	'common/users-controller',
	'common/devices-controller',

	'common/statistics-controller',
	'common/device-info-controller',
	'common/assign-order-controller',
	'common/validator-modal-controller',
	'common/view-report-controller',
	'common/view-id-info-controller',
	'common/edit-user-controller',

	'common/confirmation-dialog-controller'

	], function (

		_,
		adminAppSettings,

		_angular,
		_uiRouter,
		_uiBootstrap,
		_uiUtils,
		_ngCookies,
		_ngTouch,

		_angularSlider,
		_ngSlider,
		_rzSlider,
		// _vrSlider,

		_ngAside,
		_ngIdle,
		_ngBusy,
		_ngFileUpload,
		_ngImageCropper,
		_ngChecklistModel,
		icheck,
		_ngChart,

		Identify3DObject,

		notFnRunBlock,
		// stateEventsRunBlock,

		httpInterceptorConfigBlock,
		stateDecoratorConfigBlock,

		sessionStorageService,
		// stateBufferService,
		authInterceptorService,
		// errorInterceptorService,
		// fourZeroOneInterceptorService,
		confirmationDialogService,

		onEnterDirective,

		LoginController,
		SignUpController,
		MasterController,
		OrdersController,
		UsersController,
		DevicesController,

		StatisticsController,
		DeviceInfoController,
		AssignOrderController,
		ValidatorModalController,
		ViewReportController,
		ViewIDInfoController,
		EditUserController,

		ConfirmationDialogController
	) {

		angular.module('ngICheck', []).directive(
		    'ngICheck', [
		        '$timeout',
		        function ($timeout) {
		            return {
		                require: 'ngModel',
		                link: function ($scope, $element, $attrs, ngModel) {
		                    $timeout(function () {
		                        $scope.$watch($attrs.ngModel, function () {
		                            $element.iCheck('update');
		                        });

		                        if (!$attrs.ngICheckCheckboxClass) {
		                            $attrs.$set('ngICheckCheckboxClass', 'icheckbox_square-blue');
		                        }

		                        if (!$attrs.ngICheckRadioClass) {
		                            $attrs.$set('ngICheckRadioClass', 'iradio_square-blue');
		                        }

		                        $element.iCheck({
		                            checkboxClass: $attrs.ngICheckCheckboxClass,
		                            radioClass: $attrs.ngICheckRadioClass
		                        }).on('ifChanged', function (event) {
		                            if ($attrs.ngModel) {
		                                switch ($element.attr('type')) {
		                                case 'checkbox':
		                                    $scope.$apply(function () {
		                                        ngModel.$setViewValue(event.target.checked);
		                                    });

		                                    break;

		                                case 'radio':
		                                    $scope.$apply(function () {
		                                        ngModel.$setViewValue(event.target.checked ? $attrs.value : null);
		                                    });

		                                    break;
		                                }

		                                // call some custom method:
		                                if($attrs.ngICheckIfChanged)
		                                {
		                                    // console.log(">>>",$attrs.ngICheckIfChanged);
		                                    $scope.$eval($attrs.ngICheckIfChanged);
		                                }
		                            }
		                        });
		                    });
		                }

		            };
		        }
		    ]
		);

		var dependencies = [
		_uiRouter.moduleId,
		_uiBootstrap.moduleId,
		_uiUtils.moduleId,
		_ngCookies.moduleId,
		// _ngTouch.moduleId,
		_angularSlider.moduleId,
		// _vrSlider.moduleId,
		'rzModule',
		_ngAside.moduleId,
		_ngIdle.moduleId,
		_ngBusy.moduleId,
		_ngChecklistModel.moduleId,
		_ngImageCropper,
		'ngICheck',
		_ngChart.moduleId,
		'angularFileUpload'
		];

		var module = angular.module('wf.core', dependencies);

		/**** Statics ****/

		module.value('cgBusyDefaults',{
		  delay: 200,
			/*
				hung ones will be garbage collected upon forced reloads
				alternative to this is to listen to $http events and turn
				'busy' on and off.
			*/
		  minDuration: 2000,
		});

		/**** Controllers ****/

		module.controller(LoginController);
		module.controller(SignUpController);
		module.controller(MasterController);
		module.controller(OrdersController);
		module.controller(UsersController);
		module.controller(DevicesController);

		module.controller(StatisticsController);
		module.controller(DeviceInfoController);
		module.controller(AssignOrderController);
		module.controller(ValidatorModalController);
		module.controller(ViewReportController);
		module.controller(ViewIDInfoController);
		module.controller(EditUserController);

		module.controller(ConfirmationDialogController);

		/**** Models ****/

		module.factory(Identify3DObject);

		/**** Services ****/

		module.factory(sessionStorageService);
		// module.factory(stateBufferService);
		module.factory(authInterceptorService);
		// module.factory(errorInterceptorService);
		// module.factory(fourZeroOneInterceptorService);
		module.factory(confirmationDialogService);

		/**** Directives ****/

		module.directive(onEnterDirective);

		module.directive('datepickerPopup', function (){
		// http://stackoverflow.com/questions/24198669/angular-bootsrap-datepicker-date-format-does-not-format-ng-model-value
		    return {
		        restrict: 'EAC',
		        require: 'ngModel',
		        link: function(scope, element, attr, controller) {
		      //remove the default formatter from the input directive to prevent conflict
		      controller.$formatters.shift();
		  }
		}
		});

		/**** Filters ****/

		module.filter('tel', function () {
		    return function (tel) {
		        // console.log(tel);
		        if (!tel) { return ''; }

		        var value = tel.toString().trim().replace(/^\+/, '');

		        if (value.match(/[^0-9]/)) {
		            return tel;
		        }

		        var country, city, number;

		        switch (value.length) {
		            case 1:
		            case 2:
		            case 3:
		                city = value;
		                break;

		            default:
		                city = value.slice(0, 3);
		                number = value.slice(3);
		        }

		        if(number){
		            if(number.length>3){
		                number = number.slice(0, 3) + '-' + number.slice(3,7);
		            }
		            else{
		                number = number;
		            }

		            return ("(" + city + ") " + number).trim();
		        }
		        else{
		            return "(" + city;
		        }

		    };
		});

		/**** Run blocks ****/

		// module.run(stateEventsRunBlock);

		// module.run(notFnRunBlock);

		module.run(['$rootScope', '$state', '$stateParams', '$location', '$interval', '$q', '$urlRouter',
			 function ($rootScope, $state, $stateParams, $location, $interval, $q, $urlRouter) {

					$rootScope.$on('$stateChangeSuccess',function(x, y, z, os){
						if(!$state.includes(os) || $state.is(os))
								$("html, body").animate({ scrollTop: 0 }, 200);
					});

				}
		]);

		module.run(['$idle', function($idle) {
		  $idle.watch();
		}]);

		/**** configrations ****/

		module.config(httpInterceptorConfigBlock);

		module.config(stateDecoratorConfigBlock);

		module.config(['$logProvider', '$urlRouterProvider', function($logProvider, $urlRouterProvider){
			$logProvider.debugEnabled(adminAppSettings.debug);
			// angular-ui/ui-router/commit/c72d8ce11916d0ac22c81b409c9e61d7048554d7
			// $urlRouterProvider.deferIntercept();
		}]);

		module.config(['$keepaliveProvider', '$idleProvider', function($keepaliveProvider, $idleProvider) {
		  $idleProvider.idleDuration(3); // in seconds
		  $idleProvider.warningDuration(10); // in seconds
		  $keepaliveProvider.interval(2); // in seconds
		}]);

		module.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

			// $locationProvider.html5Mode(true);
			// $locationProvider
			//   .html5Mode(false)
			//   .hashPrefix('!');
			/* routes */

			// $locationProvider.otherwise({
		  //       redirectTo: '/#/'
		  //   });

			 $urlRouterProvider.otherwise('/');

			$stateProvider.state('gate', {
				url: "/",
				params: {
					inactive: {value: false}
				},
				views: {
					'container': {
						templateUrl: "common/login.html",
						controller: 'LoginController as login'
					}
				}
			});

			$stateProvider.state('signup', {
				url: "/register",
				params: {
					inactive: {value: false}
				},
				views: {
					'container': {
						templateUrl: "common/signup.html",
						controller: 'SignUpController as signup'
					}
				}
			});

			$stateProvider.state('identify3D', {
				abstract: true,
				url: "/admin",
				// url: '/login?redirect',
				views: {
					'container': {
						templateUrl: "common/master.html",
						controller: 'MasterController as master'
					}
				},
				resolve: {
					currentUser: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
						return Identify3D.getCurrentUser();
					}],
					statsData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
						return Identify3D.get3DStats();
					}]
				}
			});

			$stateProvider.state('identify3D.statistics', {
				url: "/statistics/createdAfter/:createdAfter/createdBefore/:createdBefore",
				views: {
					'interface': {
						templateUrl: "common/statistics.html",
						controller: 'StatisticsController as statistics'
					}
				},
				resolve: {

				}
			});

			$stateProvider.state('identify3D.devices', {
				url: "/devices/pageNum/:pageNum/status/:prescriptionStatus/createdAfter/:createdAfter/createdBefore/:createdBefore/:keyword",
				views: {
					'interface': {
						templateUrl: "common/devices.html",
						controller: 'DevicesController as devices'
					}
				},
				resolve: {
					devicesData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', 'currentUser', function($q, $rootScope, $state, $stateParams, Identify3D, currentUser){

						var keyword = $stateParams.keyword;

						var currentUserId = currentUser.unique_id;
						var pageNum = $stateParams.pageNum;

						var createdAfter = $stateParams.createdAfter;
						var createdBefore = $stateParams.createdBefore;

						var prescriptionStatus = $stateParams.prescriptionStatus;

						return Identify3D.get3DDevices(pageNum, currentUserId, keyword, createdAfter, createdBefore, prescriptionStatus);
					}]
				}
			});

			$stateProvider.state('identify3D.devices.deviceInfo', {
				url: "/device-info/:deviceId",
				resolve: {
					modalInstance: ['$stateParams', '$aside', 'devicesData', function($stateParams, $aside, devicesData){

						var deviceId = $stateParams.deviceId;
						var devices = devicesData.entries;

						var modalInstance = $aside.open({
							templateUrl: 'common/device-info.html',
							placement: 'left',
							size: 'md',
							backdrop: 'static',
							keyboard: false,
							controller: 'DeviceInfoController as deviceInfo',
							resolve: {
								deviceData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

									var device = _.findWhere(devices, {deviceId: deviceId});

									return angular.extend({}, device);
								}],
								deviceDynamicData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
									return Identify3D.get3DDevice(0, deviceId);
								}]
							}
						});

						return modalInstance;
					}]
				},
				onEnter: ['$rootScope', '$aside', function($rootScope, $aside){
				}],
				onExit: ['$rootScope', 'modalInstance', '$aside', function($rootScope, modalInstance, $aside){
					modalInstance.close();
				}]
			});


			$stateProvider.state('identify3D.orders.viewReport', {
				url: "/report/:orderNumber/:authNumber",
				resolve: {
					modalInstance: ['$stateParams', '$aside', 'ordersData', function($stateParams, $aside, ordersData){


						var authNumber = $stateParams.authNumber;
						var orderNumber = $stateParams.orderNumber;
            var orders = ordersData;

						var modalInstance = $aside.open({
							templateUrl: 'common/view-report.html',
							placement: 'left',
							size: 'lg',
							backdrop: 'static',
							keyboard: false,
							controller: 'ViewReportController as viewReport',
							resolve: {
								orderData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

                  var order = _.findWhere(orders, {'order_id': orderNumber, authorization_id: authNumber});

									return angular.extend({}, order);
								}],
								// reportData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
                //   var order = _.findWhere(orders, {'orderNumber': orderNumber});
                //   var designId = order.designId;
                //   return Identify3D.get3DReport(0, designId);
								// }]
							}
						});

						return modalInstance;
					}]
				},
				onEnter: ['$rootScope', '$aside', function($rootScope, $aside){
				}],
				onExit: ['$rootScope', 'modalInstance', '$aside', function($rootScope, modalInstance, $aside){
					modalInstance.close();
				}]
			});

			$stateProvider.state('identify3D.orders.viewIDInfo', {
				url: "/id-onfo/:orderNumber/:authNumber",
				resolve: {
					modalInstance: ['$stateParams', '$aside', 'ordersData', function($stateParams, $aside, ordersData){


						var authNumber = $stateParams.authNumber;
						var orderNumber = $stateParams.orderNumber;
						var orders = ordersData;

						var modalInstance = $aside.open({
							templateUrl: 'common/view-id-info.html',
							placement: 'right',
							size: 'md',
							backdrop: 'static',
							keyboard: false,
							controller: 'ViewIDInfoController as viewIDInfo',
							resolve: {
								orderData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

									var order = _.findWhere(orders, {'order_id': orderNumber, authorization_id: authNumber});

									return angular.extend({}, order);
								}],
								// reportData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
								//   var order = _.findWhere(orders, {'orderNumber': orderNumber});
								//   var designId = order.designId;
								//   return Identify3D.get3DReport(0, designId);
								// }]
							}
						});

						return modalInstance;
					}]
				},
				onEnter: ['$rootScope', '$aside', function($rootScope, $aside){
				}],
				onExit: ['$rootScope', 'modalInstance', '$aside', function($rootScope, modalInstance, $aside){
					modalInstance.close();
				}]
			});

			$stateProvider.state('identify3D.users', {
				url: "/users/pageNum/:pageNum/status/:prescriptionStatus/createdAfter/:createdAfter/createdBefore/:createdBefore/:keyword",
				views: {
					'interface': {
						templateUrl: "common/users.html",
						controller: 'UsersController as users'
					}
				},
				resolve: {
					ordersData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', 'currentUser', function($q, $rootScope, $state, $stateParams, Identify3D, currentUser){

						var keyword = $stateParams.keyword;

						var currentUserId = currentUser.unique_id;
						var pageNum = $stateParams.pageNum;

						var createdAfter = $stateParams.createdAfter;
						var createdBefore = $stateParams.createdBefore;

						var prescriptionStatus = $stateParams.prescriptionStatus;

						return Identify3D.get3DOrders(pageNum, currentUserId, keyword, createdAfter, createdBefore, prescriptionStatus);
					}],

					devicesData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', 'currentUser', function($q, $rootScope, $state, $stateParams, Identify3D, currentUser){
						return Identify3D.get3DDevices();
					}]

				}
			});


			$stateProvider.state('identify3D.users.editUser', {
				url: "/edit-user/:userId",
				resolve: {
					modalInstance: ['$stateParams', '$aside', 'ordersData', function($stateParams, $aside, ordersData){


						var authNumber = $stateParams.authNumber;
						var orderNumber = $stateParams.orderNumber;
						var orders = ordersData;

						var userId = $stateParams.userId;

						var modalInstance = $aside.open({
							templateUrl: 'common/edit-user.html',
							placement: 'right',
							size: 'md',
							backdrop: 'static',
							keyboard: false,
							controller: 'EditUserController as editUser',
							resolve: {
								userData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

									// var order = _.findWhere(orders, {'order_id': orderNumber, authorization_id: authNumber});

									if(userId === -1) {
										return null;
									}
									return angular.extend({}, {});
								}],
								// reportData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
								//   var order = _.findWhere(orders, {'orderNumber': orderNumber});
								//   var designId = order.designId;
								//   return Identify3D.get3DReport(0, designId);
								// }]
							}
						});

						return modalInstance;
					}]
				},
				onEnter: ['$rootScope', '$aside', function($rootScope, $aside){
				}],
				onExit: ['$rootScope', 'modalInstance', '$aside', function($rootScope, modalInstance, $aside){
					modalInstance.close();
				}]
			});


			$stateProvider.state('identify3D.orders', {
				url: "/orders/pageNum/:pageNum/status/:prescriptionStatus/createdAfter/:createdAfter/createdBefore/:createdBefore/:keyword",
				views: {
					'interface': {
						templateUrl: "common/orders.html",
						controller: 'OrdersController as orders'
					}
				},
				resolve: {
					ordersData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', 'currentUser', function($q, $rootScope, $state, $stateParams, Identify3D, currentUser){

						var keyword = $stateParams.keyword;

						var currentUserId = currentUser.unique_id;
						var pageNum = $stateParams.pageNum;

						var createdAfter = $stateParams.createdAfter;
						var createdBefore = $stateParams.createdBefore;

						var prescriptionStatus = $stateParams.prescriptionStatus;

						return Identify3D.get3DOrders(pageNum, currentUserId, keyword, createdAfter, createdBefore, prescriptionStatus);
					}],

					devicesData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', 'currentUser', function($q, $rootScope, $state, $stateParams, Identify3D, currentUser){
						return Identify3D.get3DDevices();
					}]

				}
			});

			$stateProvider.state('identify3D.orders.assign', {
				url: "/assign/:orderNumber",
				resolve: {
					modalInstance: ['$stateParams', '$aside', 'ordersData', 'devicesData', function($stateParams, $aside, ordersData, devicesData){


						var orderNumber = parseInt($stateParams.orderNumber, 10);
						var orders = ordersData;
						var printers = devicesData.entries;

						var modalInstance = $aside.open({
							templateUrl: 'common/assign-order.html',
							placement: 'right',
							size: 'lg',
							backdrop: 'static',
							// windowClass: 'customModalWindowClass',
							keyboard: false,
							controller: 'AssignOrderController as assignOrder',
							resolve: {
								orderData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

									var order = _.findWhere(orders, {'order_id': orderNumber});
									return angular.extend({}, order);
								}],
								devicesData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){
									return printers;
								}],
								orderFormData: ['$q', '$rootScope', '$state', '$stateParams', 'Identify3DObject', function($q, $rootScope, $state, $stateParams, Identify3D){

									var order = _.findWhere(orders, {'order_id': orderNumber});
									var designId = order.dsiid;
									return Identify3D.get3DOrderForm(designId);
								}]
							}
						});

						return modalInstance;
					}]
				},
				onEnter: ['$rootScope', '$aside', function($rootScope, $aside){
				}],
				onExit: ['$rootScope', 'modalInstance', '$aside', function($rootScope, modalInstance, $aside){
					modalInstance.close();
				}]
			});

		}]);

		return {

			bootstrap: function(){
				angular.bootstrap(document, [module.name]);
			},

			module: module
		};

	});
