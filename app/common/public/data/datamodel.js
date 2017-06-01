'use strict';

angular.module('RBIS').factory('datamodel', ['$window','$rootScope','utilities',function ($window, $rootScope,utilities) {

var datamodel = {};

/*  Options */
datamodel.options = {};
datamodel.options.importance = [{"key":"Core","label":"CORE"},{"key":"Non-Core","label":"NON-CORE"}];
datamodel.options.environment = [{"key":"U","label":"URBAN (METROPOLITAN)"},{"key":"N","label":"URBAN (NON-METROPOLITAN)"},{"key":"R","label":"RURAL"}];
datamodel.options.directionflow = [{"key":"One-Way","label":"ONE-WAY"},{"key":"Two-Way","label":"TWO-WAY"}];
datamodel.options.terrain = [{"key":"F","label":"FLAT"},{"key":"R","label":"ROLLING"},{"key":"M","label":"MOUNTAINOUS"}];
datamodel.options.roadaquired = [{"key":"1","label":"YES"},{"key":"0","label":"NO"}];
datamodel.options.surfacetype = [{key:"C",label:"CONCRETE"},{key:"A",label:"ASPHALT"},{key:"G",label:"GRAVEL"},{key:"E",label:"EARTH"},{key:"M",label:"MIXED"}];
datamodel.options.pavementtype = [{key:"AMGB", label:"Asphalt Mix on Granular Base"},
                                    {key:"AMAB", label:" Asphalt Mix on Asphalt Base"},
                                    {key:"AMAP", label:" Asphalt Mix on Asphalt Pavement"},
                                    {key:"AMCP", label:" Asphalt Mix on Concrete Pavement"},
                                    {key:"JPCD", label:" Joint Plain Concrete Pavement+ Dowel"},
                                    {key:"JPCO", label:" Joint Plain Concrete Pavement w/o Dowel"},
                                    {key:"CRCP", label:" Continous Reinforced Concrete Pavement"},
                                    {key:"AMCRCP", label:" Asphalt Mix Continous Reinforced Concrete Pavement"},
                                    {key:"SBST", label:" Single Bituminous Surface Treatment"},
                                    {key:"DBST", label:" Double Bituminous Surface Treatment"},
                                    {key:"SS", label:" Slurry Seal"},
                                    {key:"G", label:" Gravel"},
                                    {key:"E", label:" Earth"},
                                    {key:"NONE", label:" NONE"},
                                    {key:"UNKNOWN", label:" UNKNOWN"}];

datamodel.options.roadcondition = [{key:"N",label:"NEW"},{key:"G",label:"GOOD"},{key:"F",label:"FAIR"},{key:"P",label:"POOR"},{key:"B",label:"BAD"}]


//road
datamodel.road = {
    "RegionCode"        : {"label":"Region Code","key":"RegionCode","type":"string","options":[],"visible":false,"style":"","ctrl":"text","class":"form-control"}, 
    "ProvinceCo"        : {"label":"Province Code","key":"ProvinceCo","type":"string","options":[],"visible":false,"style":"","ctrl":"text","class":"form-control"}, 
    "CityMunCod"        : {"label":"City Code","key":"CityMunCod","type":"string","options":[],"visible":false,"style":"","ctrl":"text","class":"form-control"}, 
    "R_ID"              : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "R_NAME"            : {"label":"Name","key":"R_NAME","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "R_CLASS"           : {"label":"Class","key":"R_CLASS","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "R_Importan"        : {"label":"Importance","key":"R_Importan","type":"string","options":datamodel.options.importance,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "Environmen"        : {"label":"Environment","key":"Environmen","type":"string","options":datamodel.options.environment,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "RROW"              : {"label":"RROW","key":"RROW","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "RROWAcquir"        : {"label":"RROW Aquired","key":"RROWAcquir","type":"String","options":datamodel.options.roadaquired,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "DirFlow"           : {"label":"Direction Flow","key":"DirFlow","type":"String","options":datamodel.options.directionflow,"visible":true,"style":"","ctrl":"select","class":"form-control"}, 
    "Terrain"           : {"label":"Terrain","key":"Terrain","type":"String","options":datamodel.options.terrain,"style":"","ctrl":"select","class":"form-control"}, 
    "Length"            : {"label":"Length","key":"Length","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "RROW_acq_date"     : {"label":"RROW Acquisition Date","key":"RROW_acq_date","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},
    "RROW_acq_cost"     : {"label":"RROW Acquisition Cost","key":"RROW_acq_cost","type":"float","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "RROW_usefullife"   : {"label":"RROW Useful Life","key":"RROW_usefullife","type":"integer","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},
    "remarks"           : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"}
};

//carriageway
datamodel.RoadCarriageway = {
    "R_ID"       : {"label":"Road ID","key":"R_ID","type":"string","options":[],"visible":false,"style":"","ctrl":"label","class":"form-control"}, 
    "SegmentID"  : {"label":"Segment ID","key":"SegmentID","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "LRPStartKm" : {"label":"Start","key":"LRPStartKm","type":"String","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPStartDi" : {"label":"","key":"LRPStartDi","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},  
    "LRPEndKmPo" : {"label":"End","key":"LRPStartKm","type":"String","options":[],"style":"","ctrl":"select","class":"form-control"}, 
    "LRPEndDisp" : {"label":"","key":"LRPEndDisp","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},   
    "NumLanes"   : {"label":"No. of Lanes","key":"NumLanes","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"},    
    "LaneWidthL" : {"label":"Lane Width Left","key":"LaneWidthL","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "LaneWidthR" : {"label":"Lane Width Right","key":"LaneWidthR","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "SegmentLen" : {"label":"Segment Length","key":"SegmentLen","type":"string","options":[],"visible":true,"style":"","ctrl":"label","class":"form-control"}, 
    "SurfaceTyp" : {"label":"Surface Type","key":"SurfaceTyp","type":"String","options":datamodel.options.surfacetype,"style":"","ctrl":"select","class":"form-control"},  
    "PavementTy" : {"label":"Pavement Type","key":"PavementTy","type":"String","options":datamodel.options.pavementtype,"style":"","ctrl":"select","class":"form-control"},  
    "DateOfLast" : {"label":"Date of Last Resurfacing","key":"DateOfLast","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},  
    "Constructi" : {}, 
    "Construc_1" : {}, 
    "YearOfReco" : "Unknown", 
    "SegmentCon" : {"label":"Condition","key":"SegmentCon","type":"String","options":datamodel.options.roadcondition,"style":"","ctrl":"select","class":"form-control"},  
    "PavementThickness"  : {"label":"Pavement Thickness","key":"PavementThickness","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "PavementStrength"  : {"label":"Pavement Strength","key":"PavementStrength","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "ConstructionDate" : {"label":"Construnction Date","key":"ConstructionDate","type":"date","options":[],"visible":true,"style":"","ctrl":"date","class":"form-control"},  
    "Lifeyears"  : {"label":"Useful Life Year(s)","key":"Lifeyears","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "carriagewayWidth":{"label":"Carriageway Width","key":"carriagewayWidth","type":"string","options":[],"visible":true,"style":"","ctrl":"text","class":"form-control"}, 
    "remarks"    : {"label":"Remarks","key":"remarks","type":"string","options":[],"visible":true,"style":"","ctrl":"textarea","class":"form-control"}
}


datamodel.structure = {
                        "road":datamodel.road,
                        "RoadCarriageway":datamodel.RoadCarriageway, 
                        "RoadBridges":[],
                        "RoadCauseways":[],
                        "RoadCulverts":[],
                        "RoadDitches":[],
                        "RoadGuardrails":[],
                        "RoadHazards":[],
                        "RoadJunctions":[],
                        "RoadLightings":[],
                        "RoadLocRefPoints":[],
                        "RoadMarkings":[],
                        "RoadMedian":[],
                        "RoadPlaceNames":[],
                        "RoadShoulders":[],
                        "RoadSideFriction":[],
                        "RoadSideSlopes":[],
                        "RoadSideWalks":[],
                        "RoadSigns":[],
                        "RoadSpillways":[],
                        "RoadStructures":[]
                        }                                

return datamodel;
}]);    