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