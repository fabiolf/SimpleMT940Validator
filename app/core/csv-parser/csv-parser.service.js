'use strict';

angular.
  module('core.csvParser').
  factory('CSVParser',
    function() {
      // console.log("csv parser called!");
      return {
        // this service has just one method, the 'parse' method. It receives a csv string
        // and returns an array of arrays. Each line (item of the outer array) is an array
        // of columns.
        // the only format validation it does is to verify the number of columns of each line
        // that should match the number of columns of the header. If it finds an error, it
        // throws an exception with an error message.
        parse: function parseCSV(allData) {
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
                var lineNumber = i+1;
                throw "ERROR: Number of columns of line " + lineNumber + " does not match number of headers!";
              }
            }
          }

          return final;

        }
      };
    });
