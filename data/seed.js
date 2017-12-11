const mongoose = require("mongoose");
let env = process.env.NODE_NEV;
if(!env){env = "dev";}
const DB = "mongodb://dev:banana@ds042677.mlab.com:42677/nc-news-api-dev";
const { User, Comment, Topic, Article } = require("../models/models");
mongoose.Promise = Promise;
const usersData = require("./userData");
const commentsData = require("./commentsData");
const articlesData = require("./articlesData");
const topicsData = require("./topicsData");




const savedData = {};
    
    
function saveUser () {
    const users = usersData.map(t => new User(t).save());
    return Promise.all(users);
}
    
function saveTopics() {
    const topics = topicsData.map(t => new Topic(t).save());
    return Promise.all(topics);
}
    
function saveArticles() {
    const articles = articlesData.map(a => new Article(a).save());
    return Promise.all(articles);
}
    
function saveComments() {
    const comments = commentsData.map(c => new Comment(c).save());
    return Promise.all(comments);
}
    
function saveTestData() {
    return saveUser()
        .then((user) => {
            savedData.user = user;
            return saveTopics();
        })
        .then(topics => {
            savedData.topics = topics;
            return saveArticles();
        })
        .then(articles => {
            savedData.articles = articles;
            return saveComments(articles);
        })
        .then((comments) => {
            savedData.comments = comments;
            return savedData;
        });
}
    
mongoose.connect(DB, function (err) {
    if (!err) {
        mongoose.connection.dropDatabase()
            .then(saveTestData)
            .then(() => {
                process.exit();
            })
            .catch(console.error);
    } else {
  
        console.log(JSON.stringify(err));
        process.exit();
    }
});