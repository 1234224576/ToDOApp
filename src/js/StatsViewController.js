app.controller('StatsViewController', function ($scope,$location,$indexedDB) {

  $scope.tapBackButton = function(){
    $location.path('/');
  }
});
