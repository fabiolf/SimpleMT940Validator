'use strict';

describe('XMLParser', function() {
  var parser;
  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `csdvParser` service before each test
  beforeEach(module('core.xmlParser'));

  beforeEach(inject(function(_XMLParser_) {
    parser = _XMLParser_;
  }));

  it('should parse well formed mt940 XML files correctly', function() {
    var validFileContent = '<records><record reference="163585"><accountNumber>NL90ABNA0585647886</accountNumber><description>Candy for Vincent Bakker</description><startBalance>32.01</startBalance><mutation>+27.12</mutation><endBalance>59.13</endBalance></record><record reference="175885"><accountNumber>NL43AEGO0773393871</accountNumber><description>Clothes for Richard de Vries</description><startBalance>5429</startBalance><mutation>-939</mutation><endBalance>6368</endBalance></record></records>';
    var parsedData = parser.parse(validFileContent);
    expect(parsedData.length).toEqual(3);
    expect(parsedData[0].length).toEqual(6);
    expect(parsedData[1][0]).toEqual('163585');
    expect(parsedData[2][1]).toEqual('NL43AEGO0773393871');
  });

  it('should throw an exception when XML is invalid', function() {
    var invalidFileContent = '<records><record reference="163585"<accountNumber>NL90ABNA0585647886</accountNumber><description>Candy for Vincent Bakker</description><startBalance>32.01</startBalance><mutation>+27.12</mutation><endBalance>59.13</endBalance></record><record reference="175885"><accountNumber>NL43AEGO0773393871</accountNumber><description>Clothes for Richard de Vries</description><startBalance>5429</startBalance><mutation>-939</mutation><endBalance>6368</endBalance></record>';
    var parsedData = [];
    try {
      parsedData = parser.parse(invalidFileContent);
    } catch(e) {
      expect(e).toEqual('ERROR: Malformed XML file!');
    }
    expect(parsedData).toEqual([]);
  });
 
});
