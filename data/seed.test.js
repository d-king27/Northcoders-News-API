var mongoose = require("mongoose");
var DBs = require("../config").DB;
const { User, Comment, Topic, Article } = require("../models/models");
mongoose.Promise = Promise;




const savedData = {};
    
    
function saveUser () {
    const user = new User({
        username: "tester seed",
        name: "a tester seed",
        avatar_url: "https://avatars3.githubusercontent.com/u/6791502?v=3&s=200"
    });
    return user.save();
}
    
function saveTopics() {
    const topics = [
        { title: "Football", slug: "football" },
        { title: "Cooking", slug: "cooking" },
        { title: "Cats", slug: "cats" }
    ].map(t => new Topic(t).save());
    return Promise.all(topics);
}
    
function saveArticles() {
    const articles = [
        { title: "Cats", body: "something seed", belongs_to: "cats" },
        { title: "Football", body: "something seed", belongs_to: "football" }
    ].map(a => new Article(a).save());
    return Promise.all(articles);
}
    
function saveComments(articles) {
    const comments = [
        { body: "this is a comment seed", belongs_to: articles[0]._id, created_by: "tester seed" },
        { body: "this is another comment seed", belongs_to: articles[0]._id, created_by: "tester seed" }
    ].map(c => new Comment(c).save());
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
    
mongoose.connect(DBs.test, function (err) {
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
  