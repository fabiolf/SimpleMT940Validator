'use strict';

angular.
  module('mt940ValidatorApp').
  controller('MainCtrl', ['$scope',
    function MainCtrl($scope) {
      var self = this;
      console.log("MainCtrl called!");
      $scope.user = "fabio";
      $scope.logout = function() {
        console.log("User logged out! TODO: develop authentication");
      }
    }
  ]);
