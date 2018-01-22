'use strict';

describe('alertModule', function() {
  var alertService;

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `alertModule` service before each test
  beforeEach(module('alertModule'));

  // injecting the AlertService service for the tests
  beforeEach(inject(function(_AlertService_) {
    alertService = _AlertService_;
  }));

  it('should initiate without any alerts', function() {
    expect(alertService.get()).toEqual([]);
  });

  it('should have the same number of added alerts', function() {
    alertService.add('type1','msg1');
    expect(alertService.get().length).toEqual(1);
    alertService.add('type2','msg2');
    expect(alertService.get().length).toEqual(2);
    expect(alertService.get()[0].type).toEqual('type1');
    expect(alertService.get()[1].msg.toString()).toEqual('msg2');
  });

  it('should decrease the number of alerts by the number of calls to delete', function() {
    alertService.add('type1','msg1');
    alertService.add('type2','msg2');
    alertService.delete(0);
    expect(alertService.get().length).toEqual(1);
    expect(alertService.get()[0].type).toEqual('type2');
  });

  it('should be empty when calling deleteAll', function() {
    alertService.add('type','msg');
    alertService.add('type','msg2');
    alertService.deleteAll();
    expect(alertService.get()).toEqual([]);
  });

 
});
