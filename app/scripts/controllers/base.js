'use strict';

angular.module('trytonWebClient')
.controller('BaseCtrl', [
  '$scope',
  'Base',
  function($scope, Base) {
    $scope.base = Base;
  }
]);
