const mongoose = require("mongoose");
mongoose.Promise = Promise;
const {User} = require("../models/models");



function getUserById(req,res,next){
    User.findOne({username:req.params.username})
        .then((user)=>{
            if(user === null){
                res.status(404);
                res.send({msg:"ERROR:PAGE NOT FOUND"});
            }
            var oneUser = JSON.stringify(user);
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(oneUser);
        })
        .catch(err => {
            if(err.name === "CastError"){
                next({err: err, type: "CastError"});    
            }
            else {
                next(err);
            }
        });

}

module.exports = {getUserById};