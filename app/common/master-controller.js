/*global define*/
'use strict';

define(['lodash'], function (_) {

  function MasterController($scope, $stateParams, $rootScope, $state, $modal, currentUser, statsData, Identify3D){

    var self = this;

    self.currentUser = currentUser;

    self.statsData = statsData;

    self.selectedUsers = [];
    $rootScope.selectedUsers = self.selectedUsers;

    self.checkRow = function(selectedUser) {
      selectedUser.selected_user = !selectedUser.selected_user;
      $rootScope.selectedUsers = self.selectedUsers;
    }

    self.checkAllRows = function(selectedUsers) {

      if(self.allUsersSelected) {
        self.selectedUsers = selectedUsers;
        $rootScope.selectedUsers = self.selectedUsers;

        self.selectedUsers = _.map(self.selectedUsers, function(selectedUser){
          selectedUser.selected_user = true;
          return selectedUser;
        });

      } else{

        self.selectedUsers = _.map(self.selectedUsers, function(selectedUser){
          selectedUser.selected_user = false;
          return selectedUser;
        });

        self.selectedUsers = [];
        $rootScope.selectedUsers = [];
      }

    }

    self.isActiveState = function(stateName){
      return $state.includes(stateName);
    }

    self.logout = function (inactive){
      Identify3D.logout();
      $state.go("gate", {}, { reload:true, location:'replace' });
    }

    $scope.$on('$idleStart', function() {
        // the user appears to have gone idle
        // console.log("idleStart")
    });

    $scope.$on('$idleWarn', function(e, countdown) {
        // follows after the $idleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling $idle.watch()
        // console.log("idleWarn")

    });

    $scope.$on('$idleTimeout', function() {
        // the user has timed out (meaning idleDuration + warningDuration has passed without any activity)
        // this is where you'd log them
        // console.log("idleTimeout")
    })

    $scope.$on('$idleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
        // console.log("idleEnd")

    });

    $scope.$on('$keepalive', function() {
        // do something to keep the user's session alive
        // console.log("keepalive")
    })

    //uploader

    var uploader = self.uploader = Identify3D.uploader(/*currentClinic.unique_id*/);


  }

  return {'MasterController': ['$scope', '$stateParams', '$rootScope', '$state', '$modal', 'currentUser', 'statsData', 'Identify3DObject', MasterController]};
});
