/*global define*/
'use strict';

define([], function () {

  function ViewReportController($q, $scope, $rootScope, $stateParams, $state, $modal, $aside, $modalInstance, Identify3D, orderData, confirmationDialogService){

    var self = this;

    // self.device = angular.extend({}, deviceData);
    // self.reportData = angular.extend({}, reportData);

    self.orderData = orderData;

    self.isObject = angular.isObject;
    self.isArray = angular.isArray;

    self.ok = function(e) {
      $modalInstance.close();
      e.stopPropagation();
    };

    self.cancel = function(e) {
    };

    // self.submitForm = function(Lform){
    //
    //   if(Lform.$invalid) {
    //
    //     confirmationDialogService('md', 'Marked (*) fields are required.', false, true)
    //     .result
    //     .then(function (userResponse) {
    //     }, function (userResponse) {
    //       //this should never happen i.e cancelButton=false
    //     });
    //     return;
    //   }
    //
    //   var blockingUI = $q.defer();
    //   self.myPromise = blockingUI.promise;
    //
    //   function unblockAndNavigateToParentWithReload(){
    //     blockingUI.resolve();
    //     $state.go("^", $stateParams, {reload: true});
    //   }
    //
    //   Identify3D.editDevice(self.device)
    //   .then(function(user){
    //
    //     unblockAndNavigateToParentWithReload();
    //
    //   },function(locationMeta){
    //
    //     confirmationDialogService('md', locationMeta.error, false, true)
    //     .result
    //     .then(function (userResponse) {
    //       blockingUI.reject();
    //     }, function (userResponse) {
    //       //this should never happen i.e cancelButton=false
    //     });
    //
    //   });
    // }

  }

  return {'ViewReportController': ['$q','$scope', '$rootScope', '$stateParams', '$state', '$modal', '$aside', '$modalInstance', 'Identify3DObject', 'orderData', 'confirmationDialogService', ViewReportController]};
});
