app.controller('LogViewController', function ($scope,$location,$indexedDB) {

  $scope.tapBackButton = function(){
    $location.path('/');
  }
});
