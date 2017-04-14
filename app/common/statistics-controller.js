/*global define*/
'use strict';

define([], function () {

  function StatisticsController($scope, $stateParams, $state, $modal, $aside, $q, $http, statsData){

    var self = this;

    self.dummyPromise = null;

    self.createdAfter_jsdate = $stateParams.createdAfter ? new Date(parseInt($stateParams.createdAfter)) : null;
    self.createdBefore_jsdate = $stateParams.createdBefore ? new Date(parseInt($stateParams.createdBefore)) : null;

    self.stats = statsData;

    self.pullStats = function(){

      var createdAfter = self.createdAfter_jsdate ? self.createdAfter_jsdate.getTime() : null;
      var createdBefore = self.createdBefore_jsdate ? self.createdBefore_jsdate.getTime() : null;

      $state.go(".", {createdAfter: createdAfter, createdBefore: createdBefore}, {reload: true});
    }

    self.resetStats = function(){
      $state.go(".", {createdAfter:0, createdBefore:0}, {reload: false});
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

    // Chart.js Data
   $scope.data = [
     {
       value: self.stats.totalPrints,
       color: '#46BFBD',
       highlight: '#5AD3D1',
       label: 'Prints Completed'
     },
     {
       value: self.stats.totalPrintsLw,
       color: '#FDB45C',
       highlight: '#FFC870',
       label: 'Prints Last Week'
     }
   ];

   // Chart.js Options
   $scope.options =  {

     // Sets the chart to be responsive
     responsive: true,

     //Boolean - Whether we should show a stroke on each segment
     segmentShowStroke : true,

     //String - The colour of each segment stroke
     segmentStrokeColor : '#fff',

     //Number - The width of each segment stroke
     segmentStrokeWidth : 2,

     //Number - The percentage of the chart that we cut out of the middle
     percentageInnerCutout : 50, // This is 0 for Pie charts

     //Number - Amount of animation steps
     animationSteps : 50,

     //String - Animation easing effect
     animationEasing : 'easeOutBounce',

     //Boolean - Whether we animate the rotation of the Doughnut
     animateRotate : true,

     //Boolean - Whether we animate scaling the Doughnut from the centre
     animateScale : false,

     //String - A legend template
     legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

   };


  }

  return {'StatisticsController': ['$scope', '$stateParams', '$state', '$modal', '$aside', '$q', '$http', 'statsData', StatisticsController]};
});
