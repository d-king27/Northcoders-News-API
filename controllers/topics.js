const mongoose = require("mongoose");
mongoose.Promise = Promise;
const {Article,Topic} = require("../models/models");


function getAllTopics (req, res, next) {
    Topic.find()
        .then(topics => {
            res.send(topics);
        })
        .catch(err => next(err));
}

function getArticlesByTopic (req, res, next) {
    let chosenTopic = req.params.topic.toLowerCase();
    return Topic.find({slug:chosenTopic})
        .then(()=>{
            return Article.find({belongs_to: chosenTopic})
                .then(articles => {
                    res.status(200);
                    res.send(articles);
                })
                .catch(err => {
                    if(err.name === "CastError"){
                        next({err: err, type: "CastError"});    
                    }
                    else {
                        next(err);
                    }
                });

        });
}

module.exports={getAllTopics,getArticlesByTopic};