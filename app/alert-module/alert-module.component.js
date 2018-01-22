'use strict';

// Register `alertModule` component, along with its associated controller and template
angular.
  module('alertModule').
  component('alertModule', {
    templateUrl: 'alert-module/alert-module.template.html',
    controller: ['$sce', 'AlertService',
      function AlertCtrl($sce, AlertService) {

        var self = this;
        // alert types: success, info, warning, danger
        self.alerts = AlertService.get();

        self.addAlert = function(alertType, alertMsg) {
          AlertService.add(alertType, alertMsg);
        };

        self.closeAlert = function(index) {
          AlertService.delete(index);
        };
      }
    ]
  }
);