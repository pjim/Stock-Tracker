'use strict';

describe('Directive: charter', function () {

  // load the directive's module
  beforeEach(module('stockTrackerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<charter></charter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the charter directive');
  }));
});