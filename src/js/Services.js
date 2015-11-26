app.factory('writeToDoData', function($indexedDB) {
  return{
    write(data,date){
      var dateStr = date.getFullYear()+ "-"+(date.getMonth()+1)+"-"+date.getDate();
      var obj =
          {
            "date":dateStr,
            "data":data,
          };
      $indexedDB.openStore('todo',function(store){
        store.upsert({"date": dateStr, "year": date.getFullYear(),"month":(date.getMonth()+1),"day":date.getDate(),"data":obj});
      });
    },
  }
});

app.factory('StatsData', function($indexedDB) {
  return{
    getMonthTaskAchivementRate(date,callback){
      $indexedDB.openStore('todo',function(store){
        var find = store.query();
        find = find.$eq(date.getFullYear()).$index("year_idx");
        find = find.$eq(date.getMonth()+1).$index("month_idx");
        store.eachWhere(find).then(function(e){
          var sumTask = 0;
          var completeTask = 0;
          for(var i=0;i<e.length;i++){
            for(var j=0;j<e[i]["data"]["data"].length;j++){
              console.log(e[i]["data"]["data"][j]);
              sumTask++;
              if(e[i]["data"]["data"][j]["complete"]) completeTask++;
            }
          }
          callback(e,sumTask,completeTask);
        });
      });
    },
  }
});

app.factory('LogsData', function($indexedDB) {
  return{
    getLogData(date,callback){
      $indexedDB.openStore('todo',function(store){
        var find = store.query();
        find = find.$eq(date.getFullYear()).$index("year_idx");
        find = find.$eq(date.getMonth()+1).$index("month_idx");
        store.eachWhere(find).then(function(e){
          console.log(e);
          callback(e);
        });
      });
    },
  }
});
