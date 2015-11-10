app.controller('MainController', function ($scope, $routeParams,fetchToDoData) {
  $scope.datas = [];
  console.log(fetchToDoData.getAllToDoData("あいうえお"));


  $scope.tapAddBtn = function(){
    if($scope.todoContent == undefined || $scope.todoContent == "") return;
    $scope.datas.unshift({title:$scope.todoContent,complete:false});
    //jsonにぱーすしてデータの永続化が必要
    $scope.todoContent = "";
  };

  $scope.toggleCheck = function(){
    angular.forEach($scope.datas, function(data) {
      (data.checked) ? data["complete"] = true : data["complete"] = false;
      console.log(data["title"]+"/"+data["complete"]);
    });
  };

  $scope.deleteData = function(index){
    $scope.datas.splice(index, 1);
  };



  function dateToString(date){
    return date;
  }

});
