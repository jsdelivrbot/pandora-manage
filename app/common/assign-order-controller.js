/*global define*/
'use strict';

define([], function () {

  function AssignOrderController($window, $q, $scope, $rootScope, $stateParams, $state, $modal, $aside, $modalInstance, Identify3D, orderData, devicesData, confirmationDialogService, orderFormData){

    var self = this;
    $scope.isArray = angular.isArray;
    $scope.isObject = angular.isObject;
    $scope.extend = angular.extend;
    $scope.copy = angular.copy;

    self.order = angular.extend({}, orderData);
    self.printers = devicesData;

    self.selectedPrinter = null;

    self.orderForm = angular.extend({}, {
      DesignRules: orderFormData
    });

    function broadcastSliderRecalc() {
      setTimeout(function(){
          $scope.$broadcast('reCalcViewDimensions');
      }, 10);
    }

    broadcastSliderRecalc();

    function parseISOLocal(s) {
      var b = s.split(/\D/);
      return new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
    }

    if(self.orderForm.BusinessRules && self.orderForm.BusinessRules.expirationDate) {
      // server returns UTC dates here but assumes PST for the rest of the data being returned.
      // cropp off the 'z' from the returned string and manually parse the date to local timezone
      var noUTC = self.orderForm.BusinessRules.expirationDate.substring(0, self.orderForm.BusinessRules.expirationDate.length - 1);
      self.orderForm.BusinessRules.expirationDate = parseISOLocal(noUTC);
    }

    self.deviceDefinitions = self.orderForm.DesignRules.deviceDefinitions;

    delete self.orderForm.DesignRules.deviceDefinitions;

    self.isEditing = !!orderData;

    self.ok = function(e) {
      $modalInstance.close();
      e.stopPropagation();
    };

    self.cancel = function(e) {
    };

    self.printJob = function(Lform){

      if(Lform.$invalid) {

        confirmationDialogService('md', 'Marked (*) fields are required.', false, true)
        .result
        .then(function (userResponse) {
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });
        return;
      }

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});
      }

      var serverResponse = Identify3D.doBureauSubmitJob(self.order.designId, self.selectedPrinter.manufacturingParameters.deviceID, self.selectedPrinter.url, self.orderForm, self.order.order_id)
      // .then(function(user){
      //
      //   unblockAndNavigateToParentWithReload();
      //
      // },function(locationMeta){
      //
      //   confirmationDialogService('md', locationMeta.error, false, true)
      //   .result
      //   .then(function (userResponse) {
      //     blockingUI.reject();
      //   }, function (userResponse) {
      //     //this should never happen i.e cancelButton=false
      //   });
      //
      // });


      var modalInstance = $modal.open({
           animation: true,
           controller: 'ValidatorModalController as validatorModal',
           templateUrl: 'common/validator-modal.html',
           size: 'md',
           backdrop: 'static',
           keyboard: false,
           resolve: {
             serverResponse: function () {
               return {
                 serverResponse: serverResponse,
               };
             }
           }
         });

       modalInstance.result.then(function (fileData) {

         console.log('recevied ok')
         blockingUI.resolve();

         serverResponse.then(function(fileData){
           console.log('downloading', fileData);
           unblockAndNavigateToParentWithReload(fileData);
           return fileData;
         });

       }, function (err) {
         console.log('recevied dismiss')
           blockingUI.reject();
           return err;
       });




    }

    self.downloadJob = function(Lform){

      if(Lform.$invalid) {

        confirmationDialogService('md', 'Marked (*) fields are required.', false, true)
        .result
        .then(function (userResponse) {
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });
        return;
      }

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      // function unblockAndNavigateToParentWithReload(fileData){
      //   blockingUI.resolve();
      //   $state.go("^", $stateParams, {reload: true});
      //
      //   setTimeout(function() {
      //     var dlUri = Identify3D.getDownloadUri(fileData);
      //     $window.location.href = dlUri;
      //   }, 1000);
      //
      //
      // }


      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});
      }

      var serverResponse = Identify3D.doBureauSaveJob(self.order.designId, self.selectedPrinter.manufacturingParameters.deviceID, self.selectedPrinter.url, self.orderForm, self.order.order_id)
      // .then(function(fileData){
      //
      //   // console.log(self.orderForm)
      //   // return
      //   //
      //   // unblockAndNavigateToParentWithReload(fileData);
      //
      // },function(locationMeta){
      //
      //   // confirmationDialogService('md', locationMeta.error, false, true)
      //   // .result
      //   // .then(function (userResponse) {
      //   //   blockingUI.reject();
      //   // }, function (userResponse) {
      //   //   //this should never happen i.e cancelButton=false
      //   // });
      //
      // });


      var modalInstance = $modal.open({
           animation: true,
           controller: 'ValidatorModalController as validatorModal',
           templateUrl: 'common/validator-modal.html',
           size: 'md',
           backdrop: 'static',
           keyboard: false,
           resolve: {
             serverResponse: function () {
               return {
                 serverResponse: serverResponse,
               };
             }
           }
         });

       modalInstance.result.then(function (fileData) {

         console.log('recevied ok')
         blockingUI.resolve();

         serverResponse.then(function(fileData){
           console.log('downloading', fileData);
           unblockAndNavigateToParentWithReload(fileData);
           return fileData;
         });

       }, function (err) {
         console.log('recevied dismiss')
           blockingUI.reject();
           return err;
       });


    }






    self.cancelJob = function() {
      confirmationDialogService('md', 'Are you sure you want to cancel?', true, false)
      .result
      .then(function (userResponse) {
        console.log("cancel job", self.order.designId);

        return cancelJob(self.order.designId);

      }, function (userResponse) {
        //this should never happen i.e cancelButton=false
      });
    }


    var cancelJob = function(designId){

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});
      }

      Identify3D.doBureauCancelJob(designId)
      .then(function(data){

        unblockAndNavigateToParentWithReload();

      },function(meta){

        confirmationDialogService('md', meta.error, false, true)
        .result
        .then(function (response) {
          blockingUI.reject();
        }, function (response) {
          //this should never happen i.e cancelButton=false
        });

      });

    }

    self.openDOBCal = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      self.isDOBCalOpen = true;
    };

    self.myButtonLabels = {
      rotateLeft: ' Rotate Left',
      rotateRight: 'Rotate Right',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fit: 'Fit',
      crop: 'Crop'
    }

    self.createSliderOptions = function(field, floor, ceil) {

      var opts = {
        floor: floor,
        ceil: ceil,
        disabled: !field.isEditable,
        hideLimitLabels: true,
        step: 1,
        precision: 3,
      };
      return opts
    }

    self.stringify = JSON.stringify;


  }

  return {'AssignOrderController': ['$window', '$q','$scope', '$rootScope', '$stateParams', '$state', '$modal', '$aside', '$modalInstance', 'Identify3DObject', 'orderData', 'devicesData', 'confirmationDialogService', 'orderFormData', AssignOrderController]};
});
