'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
   _ = require('lodash');

const ROAD_ATTR_DET = ["RoadBridges", 
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


const RoadsSchema = new Schema({      
    "RegionCode" : String, 
    "ProvinceCo" : String, 
    "CityMunCod" : String, 
    "R_ID" : String, 
    "R_NAME" : String, 
    "R_CLASS" : String, 
    "R_Importan" : String, 
    "Environmen" : String, 
    "RROW" : Number, 
    "RROWAcquir" : String, 
    "DirFlow" : String, 
    "Terrain" : String, 
    "Length" : Number, 
    "oldid" : String, 
    "RoadBridges" : [Schema.Types.Mixed], 
    "RoadCarriageway" : [Schema.Types.Mixed], 
    "RoadCauseways" : [Schema.Types.Mixed], 
    "RoadCulverts" : [Schema.Types.Mixed], 
    "RoadDitches" : [Schema.Types.Mixed], 
    "RoadGuardrails" : [Schema.Types.Mixed], 
    "RoadHazards" : [Schema.Types.Mixed], 
    "RoadJunctions" : [Schema.Types.Mixed], 
    "RoadLightings" : [Schema.Types.Mixed], 
    "RoadLocRefPoints" : [Schema.Types.Mixed], 
    "RoadMarkings" : [Schema.Types.Mixed], 
    "RoadMedian" : [Schema.Types.Mixed], 
    "RoadPlaceNames" : [Schema.Types.Mixed], 
    "RoadShoulders" : [Schema.Types.Mixed], 
    "RoadSideFriction" : [Schema.Types.Mixed], 
    "RoadSideSlopes" : [Schema.Types.Mixed], 
    "RoadSideWalks" : [Schema.Types.Mixed], 
    "RoadSigns" : [Schema.Types.Mixed], 
    "RoadSpillways" : [Schema.Types.Mixed], 
    "RoadStructures" : [Schema.Types.Mixed], 
    "geometry" : Schema.Types.Mixed
},{ collection: 'Roads' });

RoadsSchema.set('toJSON', { getters: true, virtuals: true });

RoadsSchema.statics.getprovroadshortinfo =  function(code,cb){
    this.find({ProvinceCo:code,R_CLASS:'Provincial'})
        .select("R_ID R_NAME R_CLASS R_Importan Environmen RROW RROWAcquir DirFlow Terrain Length")
        .exec(function(err,docs){
        if(err){cb(err,null);return;}
        var _tree_roads = [];        
        /*
        ocs.forEach(function(attr){
            console.log(attr);
            var _attr = {};                
            _tree_roads.push(_attr);
        })
        */
        return cb(null,docs);
    });

}


RoadsSchema.statics.getcitymunroadshortinfo =  function(code,cb){
    this.find({CityMunCod:code,R_CLASS:'City'})
        .select("R_ID R_NAME R_CLASS R_Importan Environmen RROW RROWAcquir DirFlow Terrain Length")
        .exec(function(err,docs){
        if(err){cb(err,null);return;}               
        return cb(null,docs);
    });

}

RoadsSchema.statics.getroadattrtinfo =  function(rid,cb){
    this.findOne({R_ID:rid})        
        .exec(cb);

}





mongoose.model('Roads', RoadsSchema);