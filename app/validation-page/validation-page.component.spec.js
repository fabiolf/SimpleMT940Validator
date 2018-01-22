'use strict';

describe('validationModule', function() {

  // Load the module that contains the `validationModule` component before each test
  beforeEach(module('validationModule'));

  // Test the controller
  describe('ValidationCtrl', function() {
    var ctrl, MockValidationService, MockAlertService, MockCSVParser, MockXMLParser;

    beforeEach(inject(function($componentController, $injector) {
      MockValidationService = $injector.get('ValidationService');
      spyOn(MockValidationService, 'validate').and.returnValue("OK");
      MockAlertService = $injector.get('AlertService');
      spyOn(MockAlertService, 'deleteAll');
      spyOn(MockAlertService, 'add');
      MockCSVParser = $injector.get('CSVParser');
      spyOn(MockCSVParser, 'parse').and.returnValue("OK");
      MockXMLParser = $injector.get('XMLParser');
      spyOn(MockXMLParser, 'parse').and.returnValue("OK");

      ctrl = $componentController('validationModule', {
        ValidationService: MockValidationService,
        XMLParser: MockXMLParser,
        CSVParser: MockCSVParser,
        AlertService: MockAlertService
      });

    }));

    it('should call CSV parser when file type is text/csv', function() {
      //preparation
      ctrl.fileContent = [];
      ctrl.fileContent.push({type: "text/csv", name: "fakefile.csv"});
      ctrl.fileContent.push("content");

      ctrl.processData();
      //validation
      expect(MockCSVParser.parse).toHaveBeenCalled();
      expect(MockValidationService.validate).toHaveBeenCalled();
      expect(MockXMLParser.parse.calls.any()).toEqual(false);
      expect(MockAlertService.add.calls.any()).toEqual(false);
    });

    it('should call XML parser when file type is text/xml', function() {
      //preparation
      ctrl.fileContent = [];
      ctrl.fileContent.push({type: "text/xml", name: "fakefile.xml"});
      ctrl.fileContent.push("content");

      ctrl.processData();
      //validation
      expect(MockXMLParser.parse).toHaveBeenCalled();
      expect(MockValidationService.validate).toHaveBeenCalled();
      expect(MockCSVParser.parse.calls.any()).toEqual(false);
      expect(MockAlertService.add.calls.any()).toEqual(false);
    });

    it('should create an alert when file type is any other', function() {
      ctrl.fileContent = [];
      ctrl.fileContent.push({type: "image/jpg", name: "image.jpg"});
      ctrl.fileContent.push("content");

      ctrl.processData();
      //validation
      expect(MockCSVParser.parse.calls.any()).toEqual(false);
      expect(MockXMLParser.parse.calls.any()).toEqual(false);
      expect(MockValidationService.validate.calls.any()).toEqual(false);
      expect(MockAlertService.add).toHaveBeenCalled();
    });

  });

});
