angular.module('RBIS').controller("roadsupdateCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities,$stateParams,datamodel) {
    $scope.param = $stateParams;    
    $scope.road = {}
    $scope.roadsummarydisplay = 0;    
    $scope.currentloadatafields = []
    $scope.currentloadata = {}

    $scope.roadsAttr = utilities.roads.attrlabel;
    $scope.roadsAttrKeys = utilities.roads.roadattrkeys;
    $scope.roadattrgroup = utilities.roads.groups;


    $scope.currentModel= {};
    $scope.currentModel.name = "";
    $scope.currentModel.list = [];
    $scope.currentModel.currentItem = null;
    $scope.currentModel.page_attr_select = [];

var _getshapestyle = function(o,name){    
    if(name=="Carriageway"){
        return utilities.roads.STStyle(o.SurfaceTyp); 
    }else{
                return {
                                        style: function(f){
                                        return {weight: 4,
                                                opacity: 1,
                                                color: '#ff6666',
                                                dashArray: '4',
                                                fillOpacity: 0.7
                                            }											
                                        }
                        }
            };
    };


$scope.getattribdisplay =  function(attr,key){
    key = key.replace("Road","");
    return utilities.roads.getattribdisplay(attr,key);
}

$scope.loadattrsFeaturesdata =  function(key,data){
    $scope.initModelData(key,data,[]);
    //console.log($scope.currentModel.currentItem);               
    
}


$scope.init =  function(){
    $timeout(function(){
            $http.get("/api/roads/getroadshortattrinfo?rid=" + $stateParams.id).success(function(road){
                    $scope.road = road;       
                    $scope.loadAttrAsOptions("RoadLocRefPoints","RoadCarriageway");              
                    $scope.loadRoadMainData();
            });
            $("#roadmap").leafletMaps();
    });
};
$scope.loadRoadMainData =  function(){
    $scope.initModelData("road",$scope.road,[]);
};

$scope.loadAttrAsOptions =  function(attr,toattr,cb){
        $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" + attr).success(function(data){
            if(toattr=="RoadCarriageway"){
                    datamodel.structure[toattr]["LRPStartKm"].options = [];                                            
                    datamodel.structure[toattr]["LRPEndKmPo"].options = [];
                    data.forEach(function(d){                            
                            datamodel.structure[toattr]["LRPStartKm"].options.push({key:d.KMPostNo,label:d.KMPostNo});
                            datamodel.structure[toattr]["LRPEndKmPo"].options.push({key:d.KMPostNo,label:d.KMPostNo});                            
                    });                                                                                     
            }
            
            if(cb) cb(data);                                                 
        }); 


}



$scope.getattrdata = function(key,cb){        
    $scope.currentModel.currentItem = null;
    if(!$scope.road.hasOwnProperty(key)){
        $http.get("/api/roads/getroadattr?rid=" + $scope.road.R_ID + "&attr=" + key).success(function(data){
                    $scope.road[key] = data;                                        
                    $scope.initModelData(key,null,$scope.road[key]);
                    if(cb) cb(data);                             
        });                        
    }else{        
        $scope.initModelData(key,null,$scope.road[key]); 

    }     
    
};


$scope.initModelData =  function(key,currentItem,list){
    $scope.currentloadatafields = Object.keys(datamodel.structure[key])
    $scope.currentModel.name = key;
    $scope.currentModel.struct =  datamodel.structure[key];
    $scope.currentModel.list = list;
    $scope.currentModel.currentItem = currentItem;

    // breadcrums for the road/attr/features
    $scope.currentModel.page_attr_select = [];
    if(key!="road"){
        $scope.currentModel.page_attr_select = [];
        $scope.currentModel.page_attr_select.push(utilities.roads.attrlabel[key].label);
        if(currentItem){
            $scope.currentModel.page_attr_select.push($scope.getattribdisplay(currentItem,key));
        }
    }
    


};


$scope.loadattrdata =  function(data,name){
    $("#roadmap").leafletMaps("clear");
    var geojson =  data.geometry;
    name =  name.replace("Road","");
    var _style = _getshapestyle(data,name);
    var _geo = $("#roadmap").leafletMaps("setGeoJSON", geojson,null,_style);
    _geo.on({
        mouseover: function (e) {_geo.openPopup(); },
        click: function (e) {
            $("#roadmap").leafletMaps("zoomToFeature", e.target);
        }
    });
    
    var tooltiptext = utilities.roads.getattribdisplay(data,name);
    _geo.eachLayer(function (layer) {                        
            layer.bindPopup(name + ": "  + tooltiptext);
        });
    $("#roadmap").leafletMaps("zoomToFeature", _geo);
    
    
    //console.log(data);
}


  this.myDate = new Date();
  this.isOpen = false;

});