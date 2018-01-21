'use strict';

angular.
  module('core.xmlParser').
  factory('XMLParser', ['$resource',
      function($resource) {
      console.log("xml parser called!");
      var x2js = new X2JS();
      return {
        parse: function parseXML(data) {
          // console.log("TODO: implement the xml parser");
          // console.log(data);
          var json = x2js.xml_str2json(data);
          // console.log(json);
          // console.log(json.records);
          // console.log(json.records.record);
          // console.log(json.records.record.length);
          // console.log(json.records.record[0]);
          // console.log(json.records.record[0]._reference);
          // console.log(json.records.record[1].accountNumber);
          // output structure: Reference,Account Number,Description,Start Balance,Mutation,End Balance
          var parsedData = [];
          for (var i = 0; i < json.records.record.length; i++) {
            var line = [];
            line.push(json.records.record[i]._reference);
            line.push(json.records.record[i].accountNumber);
            line.push(json.records.record[i].description);
            line.push(json.records.record[i].startBalance);
            line.push(json.records.record[i].mutation);
            line.push(json.records.record[i].endBalance);
            parsedData.push(line);
          }
          return parsedData;
        }
      };
    }
  ]);
