var app = angular.module('myApp',['ngRoute','onsen']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/mainView.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
