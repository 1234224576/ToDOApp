app.controller('MainController', function ($scope, $routeParams,getToDayString) {
  $scope.name = dateToString("すぷら");

  function dateToString(date){
    return date;
  }
});
