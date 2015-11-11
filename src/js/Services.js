app.factory('fetchToDoData', function() {
  return{

    getAllToDoData(date){
      return date;
    },
    setToDoData(date,data){
      return "";
    }
  }
});

app.factory('writeToDoData', function($indexedDB) {
  return{
    write(data,date){

      var dateStr = date.getFullYear()+ "-"+(date.getMonth()+1)+"-"+date.getDate();
      var obj =
          {
            "date":dateStr,
            "data":data,
          };
      var store = $indexedDB.objectStore("todo");
      store.upsert({"date": dateStr, "year": date.getFullYear(),"month":(date.getMonth()+1),"day":date.getDate(),"data":obj});

      store.getAll().then(
        function(result){
          console.log(result[1]);
        }
      );

      return "";
    },
  }
});
