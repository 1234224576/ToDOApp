app.controller('SettingsViewController', function ($scope,$http,$location,$indexedDB) {

  $scope.formdata = {title:"",mail:"",contentdata:""};

  $scope.tapSubmitButton = function(){
    ons.notification.confirm({
      message: 'この内容で送信しますか？',
      title: '確認',
      buttonLabels: ['送信', '修正'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function(index) {
        console.log(index);
        if(index == 0){
          var errors = [];
          if($scope.formdata.title == "") errors.push("タイトル");
          if($scope.formdata.mail == "") errors.push("メールアドレス");
          if($scope.formdata.contentdata == "") errors.push("本文");
          if(errors.length != 0){
            $scope.errorDialog(errors);
            return;
          }
          $scope.sendMessage();
        }
      }
    });
  }

  $scope.errorDialog = function(errorContents){
    ons.notification.alert({
      message: errorContents.join(',')+"が入力されていません。",
      title: str = "エラー",
      buttonLabel: 'OK',
      animation: 'default',
      callback: function() {}
    });
  }

  $scope.sendMessage = function(){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';	//(a)
    $http.post('http://deeptoneworks.com/sendmail.php',$scope.formdata)	//(b)
    	.success(function(data, status, headers, config){
        if(status == 200){
          $scope.formdata = {};
          $scope.sendCorrectDialog();
        }else {
          $scope.sendFailedDialog();
        }
    	});
  }

  $scope.sendCorrectDialog = function(){
    ons.notification.alert({
      message: "送信しました",
      title: str = "送信完了",
      buttonLabel: 'OK',
      animation: 'default',
      callback: function() {}
    });
  }
  $scope.sendFailedDialog = function(){
    ons.notification.alert({
      message: "送信に失敗しました。申し訳ございませんが再度送信し直して下さい。",
      title: str = "エラー",
      buttonLabel: 'OK',
      animation: 'default',
      callback: function() {}
    });
  }

  $scope.tapBackButton = function(){
    $location.path('/');
  }
});
