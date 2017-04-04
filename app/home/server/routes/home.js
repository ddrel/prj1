'use strict';

module.exports = (app)=>{
        //Home Page    
        app.get("/",(req,res)=>{    
                res.locals.users = (req.user || null);         
                res.render("index");            
        });
}