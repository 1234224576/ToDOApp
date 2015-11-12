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
