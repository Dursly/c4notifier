'use strict';

describe('Controller: userctrl', function () {

  // load the controller's module
  beforeEach(module('contactListManager'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('userctrl', {
      $scope: scope
    });
  }));

  it('L\'array items dovrebbe essere 0', function () {
    dump(scope.items.length);
    expect(scope.items.length).toBe(0);
  });
  /*
  it('Dovrebbe cambiare lo stato viewOnline da false a true', function(){
    scope.viewOnline = false;
    expect(scope.changeViewOnline()).toBe(true);
  });
  */
});
