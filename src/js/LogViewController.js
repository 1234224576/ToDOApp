app.controller('LogViewController', function ($scope,$location,$indexedDB,LogsData) {

  $scope.currentDate = new Date();

  $scope.datas = [];
  requestData();

  $scope.tapBackButton = function(){
    $location.path('/');
  }
  $scope.tapBeforeMonth = function(){
    $scope.currentDate = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),0);
    requestData();
  }

  $scope.tapNextMonth = function(){
    $scope.currentDate = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth()+2,0);
    requestData();
  }

  function requestData(){
    LogsData.getLogData($scope.currentDate,function(data){
      $scope.datas = data.reverse();
    });
  }

});
