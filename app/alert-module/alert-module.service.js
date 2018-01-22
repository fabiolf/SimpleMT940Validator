
angular.
  module('alertModule').
  factory('AlertService', ['$sce',
    function($sce) {
      // console.log("alertService called!");
      var alerts = [];
      return {
        add: function newAlert(alertType, alertMsg) {
          alerts.push({type: alertType, msg: $sce.trustAsHtml(alertMsg)});
        },
        get: function getAlerts() {
          return alerts;
        },
        delete: function deleteAlert(index) {
          alerts.splice(index, 1);
        },
        deleteAll: function deleteAllAlerts() {
          // alerts = [];
          alerts.splice(0, alerts.length);
        }
      };
    }
  ]);
