'use strict';

describe('CSVParser', function() {

  var parser;
  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `csdvParser` service before each test
  beforeEach(module('core.csvParser'));

  // injects the CSVParser service
  beforeEach(inject(function(_CSVParser_) {
    parser = _CSVParser_;
  }));

  it('should parse well formed UNIX CSV files correctly', function() {
    var validFileContent = "col1,col2,col3\nval1,val2,val3\nval4,val5,val6";
    var parsedData = parser.parse(validFileContent);
    expect(parsedData.length).toEqual(3);
    expect(parsedData[0].length).toEqual(3);
    expect(parsedData[0][0]).toEqual('col1');
    expect(parsedData[2][2]).toEqual('val6');
  });

  it('should parse well formed Windows CSV files correctly', function() {
    var validFileContent = "col1,col2,col3\r\nval1,val2,val3\r\nval4,val5,val6";
    var parsedData = parser.parse(validFileContent);
    expect(parsedData.length).toEqual(3);
    expect(parsedData[0].length).toEqual(3);
    expect(parsedData[0][0]).toEqual('col1');
    expect(parsedData[2][2]).toEqual('val6');

  });

  it('should throw an exception when CSV is invalid', function() {
    var invalidFileContent = "col1,col2,col3\nval1,val3\nval4,val5,val6";
    //expect(parser.parse(invalidFileContent)).toThrow("ERROR: Number of columns of line 2 does not match number of headers!");
    var parsedData = [];
    try {
      parsedData = parser.parse(invalidFileContent);
    } catch(e) {
      expect(e).toEqual('ERROR: Number of columns of line 2 does not match number of headers!');
    }
    expect(parsedData).toEqual([]);
  });

 
});
