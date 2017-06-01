angular.module('RBIS').controller("roadmapsCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {


    //Advance Search
    $scope.pagination = {};
    $scope.pagination.max = 1;
    $scope.pagination.current = 1;
    $scope.searchText = "";
    $scope.searchItems = [];
    $scope.selectedmap = 0;


    $scope.regionprovince = [];
    $scope.attribsinarr = ['Bridges','PlaceNames','Carriageway','Shoulders','Structures',
                            'LocRefPoints','Guardrails','Culverts','Lightings','Ditches',
                            'SideWalks','SideFriction','Markings','Junctions'];
    $scope.init =  function(){
        $timeout(function(){
            $("#roadmap").leafletMaps({mutilplebasemap:true});
            
            var ih = $(".page-content").innerHeight();
            $(".road-map-left").css("height",ih - 50 + "px");
            $(".road-map-right").css("height",ih -50 + "px");
            $("#roadmap").css("height",ih -50 + "px")    
            $("#roadmap").leafletMaps("refresh");

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

                $scope.onmapselect(0);

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
        var id = a.R_ID || a._id.R_ID;        
        if(!a.attr){
                    $http.get("/api/roads/getroadattrinfo?rid=" + id).success(function(data){
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


    $scope.getroads = function(qry,cb){
        $http.get("/api/roads/getroadaggmain" + qry).success(function(data){
                cb(data);
        });
    }   

    /** Events */		
    $scope.maplayers = {
             roadMutant:L.gridLayer.googleMutant({
							maxZoom: 24,
							type:'roadmap'
							})
            ,satMutant:L.gridLayer.googleMutant({
                maxZoom: 24,
                type:'satellite'
            }),
            mapbox:L.tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ")
    };


    $scope._currentlayer = {};
    $scope._currentlayer.index = 0;
    $scope._currentlayer.object = null;
    $scope.onmapselect =  function(o){
                var layer = $scope.maplayers.mapbox;
                if(o==0){
                    layer = $scope.maplayers.mapbox;
                }else if(o==1){
                    layer = $scope.maplayers.roadMutant;
                }else if(o==2){
                    layer = $scope.maplayers.satMutant;
                }

                $scope._currentlayer.index = o;                
                
             $("#roadmap").leafletMaps("getMap", function(map){
                    //console.log($scope._currentlayer.object);
                    if($scope._currentlayer.object){
                        map.removeLayer($scope._currentlayer.object);
                    }                    
                                        
                    layer.addTo(map)
                    $scope._currentlayer.object = layer;
             });
             $("#roadmap").leafletMaps("refresh");
    }


    $scope.clearsearchitem =  function(){
        $scope.searchText="";
        $scope.roadsCollection = [];
    };
    $scope.closesearchitem =  function(index){
        $scope.searchItems.splice(index,1);
    };

    $scope.addsearchitem =  function(r){        
        if($scope.searchItems.map(function(d){return d._id._id}).indexOf(r._id._id)==-1){
                $scope.getroadattrs(r)                
                $scope.searchItems.push(r);                
        };
        //console.log($scope.searchItems);
    };
    $scope.toggleAll = function(b){
        $scope.roadsCollection.forEach(function(d){
                d.checked = b;
        })
    };
    $scope.isroadsearchlist =  function(r){
        return $scope.searchItems.map(function(d){return d._id._id}).indexOf(r._id._id)>-1;
    }
    $scope.onSearch =  function(s){   
        $timeout(function(){
            if($scope.searchText==""){
                $scope.roadsCollection = [];
                return false;
            };
            
            $scope.getroads("?qry=" + s +"&limit=5",function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                        $scope.onSearching=false;
            });
        },500);

    
        
        
    }

    $scope.pageChanged = function(page){
        var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
        _qry+="&limit=5";
        $scope.getroads(_qry,function(response){
                        $scope.roadsCollection = response.data;
                        //$scope.pagination.max
                })

    }



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
                var tooltiptext = utilities.roads.displayattr(g) // utilities.roads.getattribdisplay(g,name);
                _geo.eachLayer(function (layer) {                        
                        //name + ": " +
                        layer.bindPopup(tooltiptext);
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
                //var tooltiptext = utilities.roads.getattribdisplay(o,name);
                var tooltiptext = utilities.roads.displayattr(o) 
            _geo.eachLayer(function (layer) {                        
                    //name + ": "  +
                    layer.bindPopup(tooltiptext);
                });
            $("#roadmap").leafletMaps("zoomToFeature", _geo);
        }
        


        //work around reload current map
        $scope.onmapselect($scope._currentlayer.index);

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