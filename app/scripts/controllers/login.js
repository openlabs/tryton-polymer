'use strict';

angular.module('trytonWebClient')
.controller('LoginCtrl', [
    '$scope',
    '$state',
    'tryton',
    'session',
    function($scope, $state, tryton, session) {
      $scope.loggingIn = false;
      $scope.user = {
        username : session.login,
        database : session.database,
        serverUrl : tryton.serverUrl
      };

      $scope.submit = function(form) {
        if (form.$invalid) {
          return;
        }
        $scope.loggingIn = true;
        tryton.serverUrl = $scope.user.serverUrl;
        session.doLogin($scope.user.database, $scope.user.username, $scope.user.password)
          .success(function(result){
            if(result) {
              //Logged in
              $state.go('base');
            }
            else {
              window.alert('Either Username or password is wrong.');
            }
          })
          .error(function(){
            window.alert('The device may not be connected to the internet');
          })
          .finally(function () {
            $scope.loggingIn = false;
          });
      };
    }
  ]);
