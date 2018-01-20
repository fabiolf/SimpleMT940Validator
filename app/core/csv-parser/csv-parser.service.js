'use strict';

angular.
  module('core.csvParser').
  factory('CSVParser', ['$resource',
    function($resource) {
      console.log("csv parser called!");
      return {
        parse: function parseCSV(allData) {
          console.log("TODO: implement the csv parser");
          console.log(allData);

          var splitData = allData.split(/\r\n|\n/);
          var headers = splitData[0].split(',');

          var final = [];
          final[0] = headers;

          for (var i = 1; i < splitData.length; i++) {
            if (splitData[i].length) {
              var line = [];
              line = splitData[i].split(',');
              if (line.length == headers.length) {
                final[i] = line;
              } else {
                //something is wrong with the file
                throw "ERROR: Number of columns of line " + i + " does not match number of headers!";
              }
            }
          }

          return final;

        }
      };
    }
  ]);
