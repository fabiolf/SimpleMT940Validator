'use strict';

// Register `validationModule` component, along with its associated controller and template
angular.
  module('validationModule').
  component('validationModule', {
    templateUrl: 'validation-page/validation-page.template.html',
    controller: ['ValidationService', 'XMLParser', 'CSVParser', 'AlertService',
      function ValidationCtrl(ValidationService, XMLParser, CSVParser, AlertService) {

        var self = this;

        // variable to control visibility of the report div. Should be visible only when we successfully
        // processed a file.
        self.showReport = false;
        self.validationReport;
        self.paginatedValidationReport;
        self.selectedOption = "5";
        self.reportCurrentPage = 1;
        self.reportItemsPerPage = Number(self.selectedOption);

        // boilerplate to call the parser and create an alert in case of malformed files
        var parseData = function(parser, fileName, data) {
          try {
            var splitData = parser.parse(data);
            var result = ValidationService.validate(splitData);
            return(result);
          } catch (e) {
            AlertService.add('danger', '<strong>Parsing error</strong> for file <strong>' + 
              fileName + ': </strong>' + e);
            return(undefined);
          }
        }

        // this function takes care of identifying the type of the file and choosing the right parser
        // accordingly. It also needs to control the visual elements of the page.
        self.processData = function() {
          self.showReport = false;
          // clean alerts
          AlertService.deleteAll();
          var uploaded = self.fileContent;
          if (uploaded[0].type == "text/csv") {
            self.validationReport = parseData(CSVParser, uploaded[0].name, uploaded[1]);
          } else {
            if (uploaded[0].type == "text/xml") {
              self.validationReport = parseData(XMLParser, uploaded[0].name, uploaded[1]);
            } else {
              AlertService.add('danger', '<strong>Unsupported file type:</strong> ' + uploaded[0].type);
              return;
            }
          }
          if (self.validationReport) {
            self.showReport = true;
            self.processedFileName = uploaded[0].name;
            self.totalReportItems = self.validationReport.length;
            self.reportNumPages = (self.totalReportItems / self.reportItemsPerPage);
            self.reportPageChanged();
          } 
        };

        self.reportPageChanged = function() {
          // page changed, adjust paginatedValidationReport accordingly
          var firstItem = (self.reportCurrentPage - 1) * self.reportItemsPerPage;
          var lastItem = self.reportCurrentPage * self.reportItemsPerPage;
          self.paginatedValidationReport = self.validationReport.slice(firstItem, lastItem);
        }

        self.setItemsPerPage = function() {
          self.reportItemsPerPage = Number(self.selectedOption);
          self.reportCurrentPage = 1; //reset to first page
          self.reportPageChanged();
        }

      }
    ]
  });
