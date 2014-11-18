'use strict';

angular.module('trytonWebClient')
  .factory('Base', [
    '$q',
    'session',
    function ($q, session) {

    var Base = this;
    Base.menus = [];

    var menuFields = [
      'name',
      'childs',
      'parent',
      'parent.rec_name'
    ];

    Base.getMenus = function(menuItem) {
      /*
       *Fetch and set menus in service. Gets only the top most level menu items
       *if no parentId is provided otherwise sets children menu items.
       */
      var deferred = $q.defer();
      var domain = [
        ['parent', '=', menuItem ? menuItem.id : null]
      ];
      session.rpc('model.ir.ui.menu.search_read', [domain, null, null, null, menuFields])
        .success(function(result) {
          if(!menuItem) {
            Base.menus = result;
          } else {
            menuItem.children = result;
          }
          deferred.resolve(result);
        })
        .error(function(reason) {
          deferred.reject(reason);
        });
      return deferred.promise;
    };

    return Base;
  }
]);
