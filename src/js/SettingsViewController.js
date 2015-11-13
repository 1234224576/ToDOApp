app.controller('SettingsViewController', function ($scope,$location,$indexedDB) {

  $scope.tapBackButton = function(){
    $location.path('/');
  }
});
