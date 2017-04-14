/*global define*/
'use strict';

define([], function () {

  function DevicesController($scope, $stateParams, $state, $modal, $aside, $q, $http, Identify3D, devicesData){

    var self = this;

    self.dummyPromise = null;

    self.keyword = $stateParams.keyword;
    self.createdAfter_jsdate = $stateParams.createdAfter ? new Date(parseInt($stateParams.createdAfter)) : null;
    self.createdBefore_jsdate = $stateParams.createdBefore ? new Date(parseInt($stateParams.createdBefore)) : null;

    self.serverUri = devicesData.serverUri;

    self.printers = devicesData.entries;
    self.noneFound = 1// self.printers.length === 0;

    self.prescriptionStatus = $stateParams.prescriptionStatus;

    self.totalFound = 1; //devicesData.total_items || 0;

    self.pager = {
      totalItems: devicesData.total_pages * devicesData.max_items_per_page,
      itemPerPage: devicesData.max_items_per_page,
      currentPage: $stateParams.pageNum,
      maxSize: 100
    };

    self.navigateToPage = function(){

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

     $state.go(".", {pageNum: self.pager.currentPage}, {reload: false});
    }

    self.filterBy = function() {
      self.noneFound = false;
      self.printers = null;

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      $state.go(".", {pageNum: 1, keyword: "", createdAfter:0, createdBefore:0, prescriptionStatus: self.prescriptionStatus}, {reload: false});
    }

    self.openAfterCal = function($event) {
     $event.preventDefault();
     $event.stopPropagation();
     self.isAfterCalOpen = true;
    };

    self.openBeforeCal = function($event) {
     $event.preventDefault();
     $event.stopPropagation();
     self.isBeforeCalOpen = true;
    };
  }

  return {'DevicesController': ['$scope', '$stateParams', '$state', '$modal', '$aside', '$q', '$http', 'Identify3DObject', 'devicesData', DevicesController]};
});
