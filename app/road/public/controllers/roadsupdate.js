angular.module('RBIS').controller("roadsupdateCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams,datamodel) {
    $scope.param = $stateParams;    
    $scope.road = {}
    $scope.roadsummarydisplay = 0;    
    $scope.currentloadatafields = []
    $scope.currentloadata = {}

    $scope.roadsAttr = utilities.roads.attrlabel;
    $scope.roadsAttrKeys = utilities.roads.roadattrkeys;
    $scope.roadattrgroup = utilities.roads.groups;




$scope.getattribdisplay =  function(attr,key){
    key = key.replace("Road","");
    return utilities.roads.getattribdisplay(attr,key);
}


$scope.init =  function(){
    $timeout(function(){
            $http.get("/api/roads/getroadshortattrinfo?rid=" + $stateParams.id).success(function(road){
                    $scope.road = road;
            });
    });
};

$scope.getattrdata = function(key){        
    if(!$scope.road.hasOwnProperty(key)){
        $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" + key).success(function(data){
                    $scope.road[key] = data;
        });
    };         
};


$scope.loaddatabyfield = function(a){
    $scope.currentloadatafields = Object.keys(datamodel.structure[a])
    $scope.currentloadata =  datamodel.structure[a];
    $scope.currentloadfields; 
}



$scope.loadatttrdata =  function(data){

}



  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

});