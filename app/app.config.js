'use strict';

angular.
  module('mt940ValidatorApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      console.log("Routing called!")
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<home-module></home-module>'
        }).
        when('/validation', {
          template: '<validation-module></validation-module>'
        }).
        otherwise('/home');
    }
  ]);
