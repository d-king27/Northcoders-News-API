const mongoose = require("mongoose");
mongoose.Promise = Promise;
const {Comment} = require("../models/models");

function getCommentByArticleId (req, res, next) {
    Comment.find({belongs_to: req.params.id})
        .then(comments => {
            res.send(comments);
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


function postComment (req, res, next) {
    let comment = new Comment({
        body: req.body.comment, 
        belongs_to: req.params.id
    });
    comment.save()
        .then(() => {
            return Comment.find();
        })
        .then(comments => {
            res.status(201);
            res.send(comments);
        })
        .catch(err => next(err));
}

function voteCommentById (req, res, next) {
    let inc = 0;
    if(req.query.votes === "UP") inc = 1;
    else if(req.query.votes === "DOWN") inc = -1;
    Comment.findByIdAndUpdate({_id: req.params.comment_id}, {$inc: {votes: inc}})
        .then(() => {
            return Comment.findById(req.params.comment_id);
        })
        .then(comment => {
            res.status(201);
            res.send(comment);
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

function deleteComment (req, res, next) {
    Comment.findByIdAndRemove(req.params.id)
        .then(() => {
            return Comment.find();
        })
        .then(comments => {
            res.send(comments);
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

module.exports={deleteComment,voteCommentById,postComment,getCommentByArticleId};