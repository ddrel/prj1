angular.module('RBIS').controller("roadmapsCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {

    $scope.regionprovince = [];
    $scope.attribsinarr = ['Bridges','PlaceNames','Carriageway','Shoulders','Structures',
                            'LocRefPoints','Guardrails','Culverts','Lightings','Ditches',
                            'SideWalks','SideFriction','Markings','Junctions'];
    $scope.init =  function(){
        $timeout(function(){
            $("#roadmap").leafletMaps();
            var ih = $(".page-content").innerHeight();
            $(".road-map-left").css("height",ih - 50 + "px");
            $(".road-map-right").css("height",ih -50 + "px");


            var sidebarMenu = $('.page-sidebar-menu');
            var body = $('body');
                body.addClass("page-sidebar-closed");
                sidebarMenu.addClass("page-sidebar-menu-closed");
                if (body.hasClass("page-sidebar-fixed")) {
                    sidebarMenu.trigger("mouseleave");
                }
                if ($.cookie) {
                    $.cookie('sidebar_closed', '1');
                }

        });
        $http.get("/api/location/getregionprovince").success(function(data){
                $scope.regionprovince = data;
                utilities.sort($scope.regionprovince,"Code");
        });        
    }

    $scope.getprovince =  function(a){
        var idx = $scope.regionprovince.map(function(d){return d.Code}).indexOf(a.RegionCode);
        var region = $scope.regionprovince[idx]
        var pdx = region.provinces.map(function(d){return d.Code}).indexOf(a.Code);
        return region.provinces[pdx];
    }

    $scope.loadprovince = function(a){                
        if(!a.municipalities){
            $http.get("/api/location/getmunicity?code=" + a.Code).success(function(data){
                a.municipalities = [];
                a.municipalities.push.apply(a.municipalities,data);
                utilities.sort(a.municipalities,"Name");
            });
        }
        
    }

    $scope.getprovroadshortinfo =  function(a){        
        if(!a.roads){
            $http.get("/api/roads/getprovroadshortinfo?code=" + a.Code).success(function(data){
                a.roads = [];
                a.roads.push.apply(a.roads,data);
                utilities.sort(a.roads,"R_NAME");
            });
        }
    }
    
    $scope.getcitymunroadshortinfo =  function(a){
        if(!a.roads){
            $http.get("/api/roads/getcitymunroadshortinfo?code=" + a.Code).success(function(data){
                a.roads = [];
                a.roads.push.apply(a.roads,data);
                utilities.sort(a.roads,"R_NAME");
            });
        }
    }

    $scope.getroadattrs =  function(a){
        if(!a.attr){
                    $http.get("/api/roads/getroadattrinfo?rid=" + a.R_ID).success(function(data){
                        a.attr = {}
                        a.geometry = data.geometry;
                        a.attr = utilities.road.toattr(data);                        
                    });
        }
    }
   
   $scope.getattribdisplay =  function(a,b){
       return utilities.roads.getattribdisplay(a,b);
   };
   
   var _getshapestyle = function(o,name){
        //utilities.roads.STStyle
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

    /** Events */
    $scope.onclickattr =  function(o,name){
        $("#roadmap").leafletMaps("clear");
        var data =  o.geometry;        
        if(o instanceof Array){
            o.forEach(function(g){
                var _style = _getshapestyle(g,name);
                var _geo = $("#roadmap").leafletMaps("setGeoJSON", g.geometry,null,_style);
                _geo.on({
                    mouseover: function (e) {_geo.openPopup(); },
                    click: function (e) {
                        $("#roadmap").leafletMaps("zoomToFeature", e.target);
                    }
                });
                
                $("#roadmap").leafletMaps("zoomToFeature", _geo);

                var tooltiptext = utilities.roads.getattribdisplay(g,name);
                _geo.eachLayer(function (layer) {                        
                        layer.bindPopup(name + ": " + tooltiptext);
                 });
            })

            

        }else{
            var _style = _getshapestyle(o,name);
            var _geo = $("#roadmap").leafletMaps("setGeoJSON", data,null,_style);
            _geo.on({
                mouseover: function (e) {_geo.openPopup(); },
                click: function (e) {
                    $("#roadmap").leafletMaps("zoomToFeature", e.target);
                }
            });
                var tooltiptext = utilities.roads.getattribdisplay(o,name);
            _geo.eachLayer(function (layer) {                        
                    layer.bindPopup(name + ": "  + tooltiptext);
                });
            $("#roadmap").leafletMaps("zoomToFeature", _geo);
        }
        
    }
    
    
    $scope.ontoggle_loc = function(a,b,c){
        //load municipalities        
        if(a=="prov_"){$scope.loadprovince(b)}
        //load provincial roads short info
        if(a=="road_info_prov" && b.ProvinceID){$scope.getprovroadshortinfo(b)}
        //load City/Muncipality roads short info
        if(a=="road_info_mun" && b.CityMunID){$scope.getcitymunroadshortinfo(b)}
        //load roads attributes
        if(a=="road_attr" && b.R_ID){$scope.getroadattrs(b)}

        var _key = b.Code || b.R_ID || b._id;
        var _elem = $(c.target || c.currentTarget);
        if(_elem.hasClass("fa-plus-square")){
            _elem.removeClass("fa-plus-square");
            _elem.addClass("fa-minus-square");
            $("#"+ a + _key).slideDown();
        }else{
            _elem.removeClass("fa-minus-square");
            _elem.addClass("fa-plus-square");
            $("#"+ a + _key).slideUp();
        }

    }

    $scope.onclick_municipality =  function(a){
            console.log(a);
    }

})