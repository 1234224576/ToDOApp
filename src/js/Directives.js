app.directive('myDateView', function() {
  return {
    restrict: 'E',
    template:
      '<div>'+
      ' <img id="dateLabelBackgroundImage" src="{{imageSrc}}">' +
      ' <p class="dateLabel">{{year}}-{{month}}-{{day}}</p>' +
      '</div>',
    replace: true,
    scope: true,
    link: function(scope, element, attrs) {
      var date = new Date()
      var h = date.getHours();
      if((h >=  0) && (h <  5)) scope.imageSrc = "./src/img/Night.jpg";
      if((h >=  5) && (h <  9)) scope.imageSrc = "./src/img/Morning.jpg";
      if((h >=  9) && (h <  17)) scope.imageSrc = "./src/img/Noon.jpg";
      if((h >=  17) && (h < 21)) scope.imageSrc = "./src/img/Evening.jpg";
      if((h >= 21) && (h < 24)) scope.imageSrc = "./src/img/Night.jpg";
      scope.year = date.getFullYear();
      scope.month = date.getMonth()+1;
      scope.day = date.getDate();
    }
  };
});
