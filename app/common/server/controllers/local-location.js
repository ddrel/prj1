'use strict';
const mongoose = require('mongoose');

exports.getregionprovince =  (req,res)=>{
    var region = mongoose.model("Regions");        
        region.getregionprovince(function(err,data){
                    res.status(200).json(data);
        });
}


exports.getmunicity = (req,res)=>{
       var citymuni = mongoose.model("CityMun");        
       var _code = req.query.code; 
        citymuni.getmunicity(_code,function(err,data){
            if(err) {res.status(500).json(err); return;}             
            res.status(200).json(data);
        }); 
}