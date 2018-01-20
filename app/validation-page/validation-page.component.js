'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('validationModule').
  component('validationModule', {
    templateUrl: 'validation-page/validation-page.template.html',
    controller: ['$location', 'ValidationService', 'XMLParser', 'CSVParser',
      function ValidationCtrl($location, ValidationService, XMLParser, CSVParser) {
        console.log("ValidationCtrl called!");

        var self = this;
        self.showReport = false;
        self.parsingError = false;
        self.parsingErrorMessage = "";

        self.processData = function() {
          self.showReport = false;
          self.parsingError = false;
          self.parsingErrorMessage = "";
          var uploaded = self.fileContent;
          if (uploaded[0].type == "text/csv") {
            try {
              var splitData = CSVParser.parse(uploaded[1]);
              console.log("CSV parsing succeeded!");
              console.log(splitData);
              self.validationReport = ValidationService.validate(splitData);
              self.showReport = true;
            } catch (e) {
              // TODO: implement bootstrap alert
              self.parsingError = true;
              self.parsingErrorMessage = e;
              console.log("CSV parsing failed!");
              console.log(e);
            }
          } else {
            if (uploaded[0].type == "text/xml") {
              try {
                var splitData = XMLParser.parse(uploaded[1]);
                console.log("XML parsing succeeded!");
                console.log(splitData);
                self.validationReport = ValidationService.validate(splitData);
                self.showReport = true;
              } catch(e) {
                // TODO: implement bootstrap alert
                self.parsingError = true;
                self.parsingErrorMessage = e;
                console.log("XML parsing failed!");
                console.log(e);
              }
            } else {
              //TODO: implement bootstrap alert
              console.log("Wrong data type!");
            }
          }
        };

      }
    ]
  });
