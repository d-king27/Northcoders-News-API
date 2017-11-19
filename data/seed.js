var mongoose = require('mongoose')
var DB = ''
const { Users, Comments, Topics, Articles } = require('../models/models');
mongoose.Promise = Promise
const usersData = require('./usersData')
const commentsData = require('./commentsData')
const articlesData = require('./articlesData')
const topicsData = require('./topicsData')




    const savedData = {};
    
    
    function saveUser () {
        const users = usersData.map(t => new Users(t).save());
          return Promise.all(users);
        }
    
    function saveTopics() {
      const topics = topicsData.map(t => new Topics(t).save());
      return Promise.all(topics);
    }
    
    function saveArticles() {
      const articles = articlesData.map(a => new Articles(a).save());
      return Promise.all(articles);
    }
    
    function saveComments(articles) {
      const comments = commentsData.map(c => new Comments(c).save());
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
        .then(data => {
           process.exit();
        })
        .catch(console.error);
      } else {
  
        console.log(JSON.stringify(err));
        process.exit();
      }
    });