var mongoose = require('mongoose')
var DBs = require('../config.js').DB;
const { Users, Comments, Topics, Articles } = require('../models/models');
mongoose.Promise = Promise




    const savedData = {};
    
    
    function saveUser () {
      const user = new Users({
        username: 'tester seed',
        name: 'a tester seed',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200'
      });
      return user.save();
    }
    
    function saveTopics() {
      const topics = [
        { title: 'Football', slug: 'football' },
        { title: 'Cooking', slug: 'cooking' },
        { title: 'Cats', slug: 'cats' }
      ].map(t => new Topics(t).save());
      return Promise.all(topics);
    }
    
    function saveArticles() {
      const articles = [
        { title: 'Cats', body: 'something seed', belongs_to: 'cats' },
        { title: 'Football', body: 'something seed', belongs_to: 'football' }
      ].map(a => new Articles(a).save());
      return Promise.all(articles);
    }
    
    function saveComments(articles) {
      const comments = [
        { body: 'this is a comment seed', belongs_to: articles[0]._id, created_by: 'tester seed' },
        { body: 'this is another comment seed', belongs_to: articles[0]._id, created_by: 'tester seed' }
      ].map(c => new Comments(c).save());
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
    
    mongoose.connect(DBs.dev, function (err) {
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

  