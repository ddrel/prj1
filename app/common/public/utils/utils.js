'use strict';

angular.module('RBIS').factory('utilities', ['$window','$rootScope',function ($window, $rootScope) {
    var utilities = {};
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dayColors = [
	"#81AEF1",	// noon
	"#164F9C",	// day
	"#02356A",	// twilight
	"black"		// night
    ];

    var hourState = {
                    sunrise:5,
                    sunset:20
    };


    utilities.hourcolor = function(h){
        var _getColorIndex = function(hour){
            if (hour == hourState.sunrise) return 2;
            if (hour == hourState.sunrise) return 2;
            if (hour > hourState.sunrise && hour < hourState.sunset) return 1;
            return 3;
        }

        return dayColors[_getColorIndex(h)];
    }
    

    utilities.formatDate= function(d){
        var date = new Date(d);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      };

    utilities.formatDate2= function(d){
        var date = new Date(d);
        return (date.getMonth() + 1) + '/' + date.getDate();
      };

      utilities.formatBoolToString = function(b){
          return b?'Yes':'No';
      }

      utilities.uuid = function(){
           var G = function () {
              return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
          }
          return (G() + G()  + G()  + G()  + G()  + G() + G() + G()).toLocaleLowerCase();
      }

      utilities.getPercent = function(a,total){
          if(total ==0 && a ==0) return "0%";                    
          return  ((a / total) * 100).toFixed(2)  + "%"
      }


      utilities.convert = {};
      
      utilities.convert.CtoF=  function(d){ return Math.round(((d * 9) / 5 + 32) * 10) / 10};
      utilities.convert.FtoC =  function(d){ return Math.round(((d -32) * 5 / 9) * 10) / 10};
      
      utilities.convert.MilestoKm =  function(d){ return Math.round((d * 1.60934) *10) / 10};
      utilities.convert.KmtoMiles =  function(d){ return Math.round((d * 0.621371) * 10) / 10};
      
      utilities.convert.CmtoInch = function(d){return Math.round((d / 2.54) *10) /10};
      utilities.convert.InchtoCm = function(d){return Math.round((d * 2.54) *10) /10};


      utilities.ObjSize = function(obj){
        var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;          
      }




      utilities.road = {};
      utilities.road.attrkeys = ["RoadBridges", 
                                "RoadCarriageway", 
                                "RoadCauseways", 
                                "RoadCulverts", 
                                "RoadDitches", 
                                "RoadGuardrails", 
                                "RoadHazards",
                                "RoadJunctions", 
                                "RoadLightings", 
                                "RoadLocRefPoints", 
                                "RoadMarkings",
                                "RoadMedian", 
                                "RoadPlaceNames", 
                                "RoadShoulders", 
                                "RoadSideFriction", 
                                "RoadSideSlopes", 
                                "RoadSideWalks",
                                "RoadSigns", 
                                "RoadSpillways", 
                                "RoadStructures"] 
      utilities.road.toattr =  function(attr){
          var _ndata = {};
             _ndata.attrs = [];
             Object.keys(attr).forEach(function(k){
                 if(utilities.road.attrkeys.indexOf(k)==-1){
                    _ndata[k] = attr[k];
                }else if(attr[k].length>0){
                    var _k = k.replace("Road","");
                    var _d = {_id:utilities.uuid(),name:_k,value:attr[k],count:attr[k].length,keyname:k};
                    _ndata.attrs.push(_d);
                }

             })
          
          utilities.sort(_ndata.attrs,"name");
          return _ndata;
      }

      utilities.sort=function(obj,field){
          obj.sort(function(a,b){
                    var nameA = a[field];
                    var nameB = b[field];
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                });
      }

            
      utilities.sortDate =  (function (a, b) {
    	    var key1 = new Date(a.date.replace(/-/g, "/").replace(".0",""));
    	    var key2 = new Date(b.date.replace(/-/g, "/").replace(".0",""));

    	    if (key1 < key2) {
    	        return -1;
    	    } else if (key1 == key2) {
    	        return 0;
    	    } else {
    	        return 1;
    	    }
    	});

    utilities.formatToDecimal =  function(s){
 		if(!s) return 0;
 		return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 	}

     utilities.formatDateAMPM =  function(dt){
		  var h =  dt.getHours();
		  var _time = (h >= 12) ? (((h==12)?12:h-12) +"PM") : (((h==0)?12:h) + "AM");		  
		  return _time;
	  }
      utilities.addhours =  function(date,h) {    
		  date.setTime(date.getTime() + (h*60*60*1000)); 
		  	return date ;   
		}
	  
      utilities.rand = function(min,max){
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
      
      
      utilities.getMonthDate =  function(date){
    	  return months[date.getMonth()] + " " + date.getDate();
      }

      utilities.forecast = {};
      utilities.forecast.chart = {};
      utilities.forecast.chart.forecastchartdata =  function(hours){
            var _temp = hours.map(function(d){return d.temp});
            var _rh = hours.map(function(d){return d.rh});

            var _x = []
                _x.push(_temp);
                _x.push(_rh);
            return _x;
        }

        utilities.forecast.chart.forecastchartlabels =  function(hours){
            var _labels = [];
            hours.map(function(d){return d.fcst_valid_local}).forEach(function(d){
                var _ampm = utilities.formatDateAMPM(new Date(d));
                _labels.push(_ampm);
            });

            return _labels;
        }


      utilities.geo = {}
      utilities.geo.tocoord = function(latng,angle,radius){
          var coord = {};
          var _angle = angle * Math.PI /180;           
           coord.lat = latng.lat + radius * Math.cos((2 * Math.PI * _angle));
           coord.lng = latng.lng + radius * Math.sin((2 * Math.PI * _angle));
    
          return coord;
      }

    utilities.geo.destinationPoint = function(latng,brng, dist) {
         dist = dist / 6371;  
         brng = brng.toRad();  

         var lat1 = latng.lat.toRad(), lon1 = latng.lng.toRad();

         var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                              Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

         var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                      Math.cos(lat1), 
                                      Math.cos(dist) - Math.sin(lat1) *
                                      Math.sin(lat2));

         if (isNaN(lat2) || isNaN(lon2)) return null;

         return {lat:lat2.toDeg(), lng:lon2.toDeg()};
      }

    

    utilities.roads={}
    utilities.roads.pavement={"AMGB" :{code:"AMGB", text:"Asphalt Mix on Granular Base",color:""},
                              "AMAB" :{code:"AMAB", text:" Asphalt Mix on Asphalt Base",color:""},
                              "AMAP" :{code:"AMAP", text:" Asphalt Mix on Asphalt Pavement",color:""},
                              "AMCP" :{code:"AMCP", text:" Asphalt Mix on Concrete Pavement",color:""},
                              "JPCD" :{code:"JPCD", text:" Joint Plain Concrete Pavement+ Dowel",color:""},
                              "JPCO" :{code:"JPCO", text:" Joint Plain Concrete Pavement w/o Dowel",color:""},
                              "CRCP" :{code:"CRCP", text:" Continous Reinforced Concrete Pavement",color:""},
                              "AMCRCP" :{code:"AMCRCP", text:" Asphalt Mix Continous Reinforced Concrete Pavement",color:""},
                              "SBST" :{code:"SBST", text:" Single Bituminous Surface Treatment",color:""},
                              "DBST" :{code:"DBST", text:" Double Bituminous Surface Treatment",color:""},
                              "SS"   :{code:"SS", text:" Slurry Seal",color:""},
                              "G"    :{code:"G", text:" Gravel",color:""},
                              "E"    :{code:"E", text:" Earth",color:""},
                              "NONE" :{code:"NONE", text:" NONE",color:""},
                              "UNKNOWN"   :{code:"UNKNOWN", text:" UNKNOWN",color:""}
                            };


    utilities.roads.ST={                        
                        "C": {text:"CONCRETE",color:"#f29626"},
                        "A": {text:"ASPHALT",color:"#5a6068"},
                        "G": {text:"GRAVEL",color:"#26bff1"},
                        "E": {text:"EARTH",color:"#876f1b"},
                        "M": {text:"MIXED",color:"#357c31"}
                    };

    
    utilities.roads.STStyle = function(k){
        return {style: function(f){
                    return {weight: 6,
                            opacity: 1,
                            color: utilities.roads.ST[k].color,
                            dashArray: '4',
                            fillOpacity: 0.7
                        }											
                    }
            }
    }


    utilities.roads.getattribdisplay = function(attr,name){
       var _value = "";
       if(name=="Bridges" || name=="PlaceNames"){
            _value = attr.Name;
       }else if(name=="Carriageway"){
           _value = attr.NumLanes +"/" + attr.SurfaceTyp +"/" + attr.PavementTy + "/" +  attr.SegmentID;
       }else if(name=="Shoulders" || name=="Ditches" ||  name=="Guardrails" ||  name=="Structures" || name=="SideWalks"){
                _value = attr.Position + "/" + attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="LocRefPoints"){
           _value = "KM Post: " + attr.KMPostNo;
       }else if(name=="Culverts" || name=="SideFriction" || name=="Markings"){
           _value =  attr.TypeID + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="Lightings"){
           _value =  attr.Position +"/" + attr.Exist  + " (" +  attr.LRPStartDi + " - " + attr.LRPEndDisp  +")";
       }else if(name=="Junctions"){
                _value =  attr.TypeID + "/" +  attr.LRPStartDi;
       }

       return _value;
   }
      return utilities;
}]);
    