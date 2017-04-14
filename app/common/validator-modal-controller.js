/*global define*/
'use strict';

define([], function () {

  function ValidatorModalController($q, $scope, $rootScope, $stateParams, $state, $modal, $aside, $modalInstance, Identify3D, serverResponse, confirmationDialogService){

    var self = this;

    self.isObject = angular.isObject;
    self.isArray = angular.isArray;

    self.isWorking = true;

    self.status = true;
    self.certificate = true;
    self.device = true;
    self.expiration = true;
    self.quantity = true;
    self.parameterMismatch = true;

    self.success = false;

    self.downloadURLData = null;


    setTimeout(function(){

      serverResponse.serverResponse.then(function(fileData){


        self.downloadURLData = angular.extend({}, fileData);

        self.downloadURLData.url = Identify3D.getDownloadUri(fileData);

        console.log("succ", fileData, self.downloadURLData);


        self.success = true;
        self.isWorking = false;

        self.status = true;
        self.certificate = true;

        self.device = true;
        self.expiration = true;
        self.quantity = true;
        self.parameterMismatch = true;

      },function(meta){

        console.log("erro::", meta);

        self.success = false;
        self.isWorking = false;

        self.status = false;

        var s = meta.httpStatus;

        if (s !== 445 &&
            s !== 451 &&
            s !== 452 &&
            s !== 454 &&
            s !== 200
        ) {
          self.certificate = false;
        } else {
          // certificate is catch all
          // if none of above fail, we assume certificate pass
          self.certificate = true;
        }

        self.device = s === 445 ? false : undefined;
        self.expiration = s === 451 ? false : undefined;
        self.quantity = s === 452 ? false : undefined;
        self.parameterMismatch = s === 454 ? false : undefined;

      });

    }, 1700);

    self.ok = function(e) {
      $modalInstance.close();
      // e.stopPropagation();
    };

    self.cancel = function(e) {
      $modalInstance.dismiss();
      // e.stopPropagation();
    };


  }

  return {'ValidatorModalController': ['$q','$scope', '$rootScope', '$stateParams', '$state', '$modal', '$aside', '$modalInstance', 'Identify3DObject', 'serverResponse', 'confirmationDialogService', ValidatorModalController]};
});
