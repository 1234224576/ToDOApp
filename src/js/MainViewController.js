app.controller('MainController', function ($scope,$indexedDB,writeToDoData) {
  $scope.datas = [];

  getData(new Date());

  $scope.tapAddBtn = function(){
    if($scope.todoContent == undefined || $scope.todoContent == "") return;
    $scope.datas.unshift({title:$scope.todoContent,complete:false});

    writeToDoData.write($scope.datas,new Date());
    $scope.todoContent = "";
  };

  $scope.toggleCheck = function(){
    angular.forEach($scope.datas, function(data) {
      (data.checked) ? data["complete"] = true : data["complete"] = false;
      writeToDoData.write($scope.datas,new Date());
    });
  };

  $scope.deleteData = function(index){
    $scope.datas.splice(index, 1);
    writeToDoData.write($scope.datas,new Date());
  };

  function getData(date){
    $indexedDB.openStore('todo',function(store){
      var find = store.query();
      find = find.$eq(date.getFullYear()).$index("month_idx");
      find = find.$eq(date.getMonth()+1).$index("month_idx");
      find = find.$eq(date.getDate()).$index("day_idx");
      store.eachWhere(find).then(function(e){
        if(e[0] != undefined)  $scope.datas = e[0]["data"]["data"];
      });
    });
  }

});
