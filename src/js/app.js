var app = angular.module('myApp',['ngRoute','indexedDB','onsen']);

app.config(function ($routeProvider,$indexedDBProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'src/mainView.html',
          controller: 'MainController'
      })
      .otherwise({
          redirectTo: '/'
      });

    $indexedDBProvider
      .connection('myIndexedDB')
      .upgradeDatabase(1, function(event, db, tx){
        var objStore = db.createObjectStore('todo', {keyPath: 'date'});
        objStore.createIndex('year_idx', 'year', {unique: false});
        objStore.createIndex('month_idx', 'month', {unique: false});
        objStore.createIndex('day_idx', 'day', {unique: false});
        objStore.createIndex('data_idx', 'data', {unique: false});
      });
});
