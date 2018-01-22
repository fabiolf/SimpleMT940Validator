'use strict';

describe('ValidationService', function() {

  var service;
  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `csdvParser` service before each test
  beforeEach(module('core.validationService'));

  beforeEach(inject(function(_ValidationService_) {
    service = _ValidationService_;
  }));

  it('should validate good data', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13.33','+38.58','51.91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('Valid transaction');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');
  });

  it('should invalidate data with non-number transaction reference', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['A137243','NL93ABNA0585619023','Candy','13.33','+38.58','51.91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('A137243');
    expect(responseSplit[1]).toEqual('ERR: Transaction reference A137243 is not a number!');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');
  });

  it('should invalidate data with non-number start balance', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13b33','+38.58','51.91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('ERR: Start balance 13b33 is not a valid number!');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');
  });

  it('should invalidate data with non-number mutation', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13.33','+38b58','51.91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('ERR: Mutation +38b58 is not a valid number!');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');

  });
  it('should invalidate data with non-number end balance', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13.33','+38.58','51b91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('ERR: End balance 51b91 is not a valid number!');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');

  });
  it('should invalidate data with duplicated transaction references', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13.33','+38.58','51.91'],['137243','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('Valid transaction');
    expect(responseSplit[2]).toEqual('137243');
    expect(responseSplit[3]).toEqual('ERR: Transaction reference 137243 is not unique!');

  });
  it('should invalidate data with wrong end balance', function() {
    var validData = [['Reference','Account Number','Description','Start Balance','Mutation','End Balance'],['137243','NL93ABNA0585619023','Candy','13.33','+38.58','52.91'],['112806','NL90ABNA0585647886','other candy','16.91','-38.13','-21.22']];
    var response = service.validate(validData);
    var responseSplit = response.toString().split(',');
    expect(response.length).toEqual(2);
    expect(response[0].length).toEqual(2);
    expect(responseSplit[0]).toEqual('137243');
    expect(responseSplit[1]).toEqual('ERR: End balance 52.91 is not equal to start balance + mutation (51.91)!');
    expect(responseSplit[2]).toEqual('112806');
    expect(responseSplit[3]).toEqual('Valid transaction');

  });

 
});
