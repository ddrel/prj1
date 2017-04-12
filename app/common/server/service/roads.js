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


app.get("/api/roads/getroadattrinfo",(req,res)=>{
    roads.getroadattrinfo(req,res);
});

app.get("/api/roads/getroadshortattrinfo",(req,res)=>{
    roads.getroadshortattrinfo(req,res);
});

app.get("/api/roads/getroadattr",(req,res)=>{
    roads.getroadattr(req,res);
});


app.get("/api/roads/getroadaggmain",(req,res)=>{
    roads.getroadaggmain(req,res);
});

}
