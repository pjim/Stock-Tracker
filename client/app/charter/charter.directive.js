'use strict';

angular.module('stockTrackerApp')
  .directive('charter', function () {
    return {
      template: '<div><h1></h1></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.find(h1).text('this is the charter directive');
      }
    };
  });
