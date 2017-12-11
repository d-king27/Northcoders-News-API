const mongoose = require("mongoose");
mongoose.Promise = Promise;
const {Article} = require("../models/models");


function getAllArticles(req, res, next) {
    Article.find()
        .then(articles => {
            res.send(articles);
        })
        .catch(err => next(err));
}

function voteArticleById (req, res, next) {
    let inc = 0;
    if(req.query.votes === "UP") inc = 1;
    else if(req.query.votes === "DOWN") inc = -1;
    Article.findByIdAndUpdate({_id: req.params.article_id}, {$inc: {votes: inc}})
        .then(() => {
            return Article.findById(req.params.article_id);
        })
        .then(article => {
            res.status(201);
            res.send(article);
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

module.exports= {voteArticleById,getAllArticles};
