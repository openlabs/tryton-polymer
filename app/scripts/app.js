'use strict';

angular.module('trytonWebClient', [
    'ui.router',
    'openlabs.angular-tryton'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('', '/')
      .otherwise('/404');
    $stateProvider
      .state('base', {
        url: '/',
        templateUrl: 'views/base.html',
        controller: 'BaseCtrl'
      })
      .state('base.tree', {
        url: ':database/model/:model',
        controller: 'TreeCtrl',
        views: {
          'main-view': {
            templateUrl: 'views/tree.html',
          }
        }
      })
      .state('base.form', {
        url: ':database/model/:model/:id',
        controller: 'FormCtrl',
        views: {
          'main-view': {
            templateUrl: 'views/form.html',
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        publicAccess: true
      })
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
      });
  })
  /*
  .run(['$rootScope', '$state', 'session',
       function($rootScope, $state, session) {
         $rootScope.$on('tryton:NotLogged', function () {
           // TODO: Lock screen on NotLogged.
           $state.go('login');
         });
         $rootScope.$on('$stateChangeStart', function (event, toState) {
           if (!toState.publicAccess && !session.isLoggedIn()) {
             event.preventDefault();
             // Redirect to login page if viewing non public page and not logged-In.
             $state.go('login');
           }
         });
    }
  ])*/;
