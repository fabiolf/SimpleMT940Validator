'use strict';

angular.
  module('core.xmlParser').
  factory('XMLParser',
      function() {
      var x2js = new X2JS();
      return {
        // this service relies on X2JS library to parse the XML into a JSON object and then looks for
        // specific fields that exist in the mt940 layout according to the specification.
        parse: function parseXML(data) {
          var json = x2js.xml_str2json(data);
          if (!json) {
            throw "ERROR: Malformed XML file!";
          }
          // output structure: Reference,Account Number,Description,Start Balance,Mutation,End Balance
          var parsedData = [];
          // the first line must be a header
          var header = ['Reference','Account Number','Description','Start Balance','Mutation','End Balance']
          parsedData.push(header);
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
    });
