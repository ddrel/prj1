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
            
            $("#roadmap").leafletMaps();
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
    $scope.currentfields = a;; 
}



$scope.loadatttrdata =  function(data){

}



  this.myDate = new Date();
  this.isOpen = false;

});