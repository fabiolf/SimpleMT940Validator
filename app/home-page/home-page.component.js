'use strict';

// Register `homeModule` component, along with its associated controller and template
angular.
  module('homeModule').
  component('homeModule', {
    templateUrl: 'home-page/home-page.template.html',
    controller: ['$location', 
      function HomeCtrl($location) {
        console.log("HomeCtrl called!");

        var self = this;

        self.startValidation = function() {
          console.log("startValidation() called!");
          $location.path('validation');
        }
      }
    ]
/*
    controller: ['Phone',
      function PhoneListController(Phone) {
        this.phones = Phone.query();
        this.orderProp = 'age';
      }
    ]
*/
});
