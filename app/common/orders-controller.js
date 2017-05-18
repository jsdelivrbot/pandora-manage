/*global define*/
'use strict';

define(['lodash'], function (_) {

  function OrdersController($scope, $stateParams, $state, $modal, $aside, $q, $http, confirmationDialogService, Identify3D, ordersData){

    var self = this;

    self.dummyPromise = null;

    self.filterByDsiId = $stateParams.filterByDsiId || undefined;
    self.keyword = $stateParams.keyword;
    self.createdAfter_jsdate = $stateParams.createdAfter ? new Date(parseInt($stateParams.createdAfter)) : null;
    self.createdBefore_jsdate = $stateParams.createdBefore ? new Date(parseInt($stateParams.createdBefore)) : null;

    self.dsiids = _.groupBy(ordersData, (order) => {
      return order.dsiid
    })

    var filteredOrders = ordersData;
    if(self.filterByDsiId) {
      filteredOrders = _.filter(ordersData, function(order){
        return order.dsiid === self.filterByDsiId;
      });
    }

    var orders = _.filter(filteredOrders, function(order){
      return order.authorization_id === -1;
    });

    var authorizations = _.filter(filteredOrders, function(order){
      return order.authorization_id !== -1;
    });


    var groupedAuthorizations = _.groupBy(authorizations, function(authorizationRecord){
      return authorizationRecord.order_id;
    });

    console.log(groupedAuthorizations)

    self.orders = orders;
    self.groupedAuthorizations = groupedAuthorizations;

    self.noneFound = self.orders.length === 0;

    self.totalFound = 1 //,ordersData.total_items || 0;

    self.pager = {
      totalItems: ordersData.total_pages * ordersData.max_items_per_page,
      itemPerPage: ordersData.max_items_per_page,
      currentPage: $stateParams.pageNum,
      maxSize: 100
    };

    self.navigateToPage = function(){
      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      $state.go(".", {pageNum: self.pager.currentPage}, {reload: false});
    }

    self.archiveJob = function(designId) {
      confirmationDialogService('md', 'Are you sure you want to archive?', true, false)
      .result
      .then(function (userResponse) {
        console.log('archive now', designId);

        return archiveJob(designId);

      }, function (userResponse) {
        //this should never happen i.e cancelButton=false
      });
    }

    var archiveJob = function(designId){
      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go(".", $stateParams, {reload: true});
      }

      Identify3D.doBureauArchiveJob(designId)
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

    self.filterBy = function() {
      self.noneFound = false;
      // self.orders = null;

      // var blockingUI = $q.defer();
      // self.myPromise = blockingUI.promise;

      console.log(self.filterByDsiId);
      $state.go(".", {pageNum: 1, keyword: "", createdAfter:0, createdBefore:0, prescriptionStatus: 'created', filterByDsiId: self.filterByDsiId}, {reload: true});
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

  return {'OrdersController': ['$scope', '$stateParams', '$state', '$modal', '$aside', '$q', '$http', 'confirmationDialogService', 'Identify3DObject', 'ordersData', OrdersController]};
});
