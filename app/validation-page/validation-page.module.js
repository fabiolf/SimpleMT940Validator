'use strict';

// Define the `validationModule` module
angular.module('validationModule', [
  'ngRoute',
  'core.validationService',
  'core.csvParser',
  'core.xmlParser'
]).directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function () {
                var data = [];
                data[0] = files[0];
                data[1] = contents;
                scope.fileReader = data;
              });
          };
          r.readAsText(files[0]);
        }
      });
    }
  };
});
