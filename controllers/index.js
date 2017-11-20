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
            console.log('called')
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


// GET /api/topics/:topic_id/articles
// Return all the articles for a certain topic

// GET /api/articles
// Returns all the articles

// GET /api/articles/:article_id/comments
// Get all the comments for a individual article

// POST /api/articles/:article_id/comments
// Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"}

// PUT /api/articles/:article_id
// Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' e.g: /api/articles/:article_id?vote=up

// PUT /api/comments/:comment_id
// Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' e.g: /api/comments/:comment_id?vote=down

// DELETE /api/comments/:comment_id
// Deletes a comment

// GET /api/users/:username
// Returns a JSON object with the profile data for the specified user.

module.exports = {getAllTopics, getArticlesByTopic}