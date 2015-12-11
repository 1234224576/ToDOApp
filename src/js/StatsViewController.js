app.controller('StatsViewController', function ($scope,$location,$indexedDB,StatsData) {

  $scope.currentDate = new Date();
  $scope.beforeDate = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),0);

  StatsData.getMonthTaskAchivementRate($scope.currentDate,function(data,sum,complete){
    $scope.nowTodoSum = sum;
    $scope.nowTodoCompleted = complete;
    $scope.monthTaskRate = Math.floor((complete/(sum==0)? 1:sum)*100);
    drawDaylyRateGraph("#dayly_graph",data,$scope.currentDate);
  });

  StatsData.getMonthTaskAchivementRate($scope.beforeDate ,function(data,sum,complete){
    $scope.beforeTodoSum = sum;
    $scope.beforeTodoCompleted = complete;
    $scope.beforeMonthTaskRate = Math.floor((complete/(sum==0)? 1:sum)*100);
    drawDaylyRateGraph("#dayly_graph2",data,$scope.beforeDate);
  });


  $scope.tapBackButton = function(){
    $location.path('/');
  }
});

function drawDaylyRateGraph(id,data,currentDate){
  var daylyRates = [];
  var sumdate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0).getDate();
  for(var i=0;i<sumdate;i++){
    var sumTask = 0;
    var completeTask = 0;
    for(var j=0;j<data.length;j++){
      if(data[j]["data"] == undefined || data[j]["day"] != i+1){
        continue;
      }
      for(var k=0;k<data[j]["data"]["data"].length;k++){
        sumTask++;
        if(data[j]["data"]["data"][k]["complete"]) completeTask++;
      }
    }
    (sumTask == 0) ? daylyRates.push(0) : daylyRates.push((completeTask/sumTask) * 100);
  }


  var d3 = require('./bower_components/d3/d3.js');

  var svgHeight = 170;
  barElement = d3.select(id)
    .selectAll("rect")
    .data(daylyRates);
  barElement.enter()
    .append("rect")
    .attr("class","bar")
    .attr("height",function(d,i){
      return d * (150/100);
    })
    .attr("width",8)
    .attr("x",function(d,i){
      return i*(340/31)+30;
    })
    .attr("y",function(d,i){
      return svgHeight - d * (150/100)-10;
    })
  barElement.enter()
    .append("text")
    .attr("class","barNum")
    .attr("x",function(d,i){
      return i*(340/31) + 34;
    })
    .attr("y",svgHeight-1)
    .text(function(d,i){
      return i+1;
    });
  var yScale = d3.scale.linear()
    .domain([0,100])
    .range([160,10]);
  d3.select(id).append("g")
    .attr("class","axis")
    .attr("transform","translate(25,0)")
    .call(
      d3.svg.axis()
      .scale(yScale)
      .orient("left")
    )
}
