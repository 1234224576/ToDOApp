app.controller('MainViewController', function ($scope,$indexedDB,$location,writeToDoData) {
  $scope.datas = [];
  $scope.yesterdayDatas = [];

  //***データを全消去***//
  // $indexedDB.openStore('todo', function(store){
  //      store.clear().then(function(){
  //        // do something
  //      });
  //    });


  var today = new Date();
  getData(today,true);
  var yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  getData(yesterday,false);


  $scope.tapAddBtn = function(){
    if($scope.todoContent == undefined || $scope.todoContent == "") return;
    $scope.datas.unshift({title:$scope.todoContent,complete:false});

    writeToDoData.write($scope.datas,today);
    $scope.todoContent = "";
  };

  $scope.toggleCheck = function(isToday){
    var todoData = (isToday) ? $scope.datas : $scope.yesterdayDatas;
    var date = (isToday) ? today : yesterday;
    angular.forEach(todoData, function(data) {
      (data.checked) ? data["complete"] = true : data["complete"] = false;
      writeToDoData.write(todoData,date);
    });
  };

  $scope.deleteData = function(index,isToday){
    var todoData = (isToday) ? $scope.datas : $scope.yesterdayDatas;
    var date = (isToday) ? today : yesterday;
    todoData.splice(index, 1);
    writeToDoData.write(todoData,date);
  };

  $scope.tapStats = function(){
    $location.path('/stats');
  }
  $scope.tapLog = function(){
    $location.path('/log');
  }
  $scope.tapSetting = function(){
    $location.path('/settings');
  }

  function getData(date,isToday){
    $indexedDB.openStore('todo',function(store){
      var find = store.query();
      find = find.$eq(date.getFullYear()).$index("year_idx");
      find = find.$eq(date.getMonth()+1).$index("month_idx");
      find = find.$eq(date.getDate()).$index("day_idx");
      store.eachWhere(find).then(function(e){
        if(isToday){
          if(e[0] != undefined)  $scope.datas = e[0]["data"]["data"];
        }else{
          if(e[0] != undefined)  $scope.yesterdayDatas = e[0]["data"]["data"];
        }
      });
    });
  }

});
