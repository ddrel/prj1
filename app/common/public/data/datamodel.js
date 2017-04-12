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


datamodel.structure = {"road":datamodel.road} 


return datamodel;
}]);    