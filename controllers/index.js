const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {Topics, Articles, Comments, Users} = require('../models/models');


function getAllTopics (req, res, next) {
    Topics.find()
        .then(topics => {
            res.send(topics);
        })
        .catch(err => next(err));
}

function getArticlesByTopic (req, res, next) {

   return Topics.findById(req.params.id)
        .then(topic => {
            return Articles.find({belongs_to: topic.slug})
        })
        .then(articles => {
            res.status(200)
            res.send(articles);
        })
        .catch(err => {
            if(err.name === 'CastError'){
            next({err: err, type: 'CastError'})    
            }
            else {
                next(err)
            }
        });
}


function getAllArticles(req, res, next) {
    Articles.find()
        .then(articles => {
            res.send(articles);
        })
        .catch(err => next(err));
}

function getCommentsByArticleId (req, res, next) {
    Comments.find({belongs_to: req.params.id})
        .then(comments => {
            res.send(comments);
        })
        .catch(err => {
            if(err.name === 'CastError'){
            next({err: err, type: 'CastError'})    
            }
            else {
                next(err)
            }
        });
}


function postComment (req, res, next) {
    let comment = new Comments({
            body: req.body.comment, 
            belongs_to: req.params.id
        });
      comment.save()
        .then(() => {
            return Comments.find()
        })
        .then(comments => {
            res.status(201);
            res.send(comments);
        })
        .catch(err => next(err));
}


function voteArticleById (req, res, next) {
    let inc = 0;
    if(req.query.votes === 'UP') inc = 1;
    else if(req.query.votes === 'DOWN') inc = -1;
    Articles.findByIdAndUpdate({_id: req.params.article_id}, {$inc: {votes: inc}})
        .then(() => {
            return Articles.findById(req.params.article_id);
        })
        .then(article => {
            res.status(201);
            res.send(article);
        })
        .catch(err => {
            if(err.name === 'CastError'){
            next({err: err, type: 'CastError'})    
            }
            else {
                next(err)
            }
        });
}

function voteCommentById (req, res, next) {
    let inc = 0;
    if(req.query.votes === 'UP') inc = 1;
    else if(req.query.votes === 'DOWN') inc = -1;
    Comments.findByIdAndUpdate({_id: req.params.comment_id}, {$inc: {votes: inc}})
        .then(() => {
            return Comments.findById(req.params.comment_id);
        })
        .then(comment => {
            res.status(201);
            res.send(comment);
        })
        .catch(err => {
            if(err.name === 'CastError'){
            next({err: err, type: 'CastError'})    
            }
            else {
                next(err)
            }
        });
}

function deleteComment (req, res, next) {
    Comments.findByIdAndRemove(req.params.id)
        .then(() => {
            return Comments.find()
        })
        .then(comments => {
            res.send(comments);
        })
        .catch(err => {
            if(err.name === 'CastError'){
            next({err: err, type: 'CastError'})    
            }
            else {
                next(err)
            }
        });
}

function getUserById(req,res,next){
    Users.findOne({username:req.params.username})
    .then((user)=>{
        if(user === null){
            res.status(404)
            res.send({msg:'ERROR:PAGE NOT FOUND'})
        }
        var oneUser = JSON.stringify(user)
        res.status(200)
        res.setHeader("Content-Type", 'application/json')
        res.send(oneUser)
    })
    .catch(err => {
        if(err.name === 'CastError'){
        next({err: err, type: 'CastError'})    
        }
        else {
            next(err)
        }
    });

}


module.exports = {deleteComment,getUserById ,getAllTopics, getArticlesByTopic,getAllArticles,getCommentsByArticleId, postComment,voteArticleById,voteCommentById}