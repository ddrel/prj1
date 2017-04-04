'use strict';
const mongoose = require('mongoose');
const roads = require('../controllers/roads');
module.exports = (app)=>{

app.get("/api/roads/getprovroadshortinfo",(req,res)=>{
    roads.getprovroadshortinfo(req,res);
});

app.get("/api/roads/getcitymunroadshortinfo",(req,res)=>{
    roads.getcitymunroadshortinfo(req,res);
});


app.get("/api/roads/getroadattrtinfo",(req,res)=>{
    roads.getroadattrtinfo(req,res);
});

}
