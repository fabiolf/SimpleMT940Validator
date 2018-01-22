'use strict';

describe('alertModule', function() {

  // Load the module that contains the `validationModule` component before each test
  beforeEach(module('alertModule'));

  // Test the controller
  describe('AlertCtrl', function() {
    var ctrl, MockAlertService;

    beforeEach(inject(function($componentController, $injector) {
      MockAlertService = $injector.get('AlertService');
      spyOn(MockAlertService, 'add').and.callThrough();
      spyOn(MockAlertService, 'delete').and.callThrough();
      ctrl = $componentController('alertModule', {AlertService: MockAlertService});

    }));

    it('alerts should be updated when addAlert is called', function() {
      //preparation
      ctrl.addAlert('type1','msg1');
      //validation
      expect(MockAlertService.add).toHaveBeenCalled();
      expect(ctrl.alerts.length).toEqual(1);
      expect(ctrl.alerts[0].type).toEqual('type1');
      expect(ctrl.alerts[0].msg.toString()).toEqual('msg1');
    });

    it('alerts should be updated when closeAlert is called', function() {
      //preparation
      ctrl.addAlert('type1','msg1');
      ctrl.addAlert('type2','msg2');
      ctrl.closeAlert(0);
      //validation
      expect(MockAlertService.add).toHaveBeenCalled();
      expect(MockAlertService.delete).toHaveBeenCalled();
      expect(ctrl.alerts.length).toEqual(1);
      expect(ctrl.alerts[0].type).toEqual('type2');
      expect(ctrl.alerts[0].msg.toString()).toEqual('msg2');
    });
  });

});
