const express = require("express");
const app = express();
const config = require("./config");
if(!process.env.NODE_ENV){process.env.NODE_ENV = "dev";}
let db = config.DB[process.env.NODE_ENV];
if(!db){
    db = 'mongodb://dev:banana@ds042677.mlab.com:42677/nc-news-api-dev'
}
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { Users, Comments,Topics,Articles } = require("./models/models");
const topicsRouter = require("./routes/topics.js");
const articlesRouter = require("./routes/articles.js");
const usersRouter = require("./routes/users.js");
const commentsRouter = require("./routes/comments.js");
mongoose.Promise = Promise;


mongoose.connect(db, {useMongoClient: true})
    .then(() => console.log("successfully connected to", db))
    .catch(err => console.log("connection failed", err));

app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('https://github.com/d-king27/Northcoders-News-API')
})
app.get("/api",(req,res)=>{
    res.send("listening");
    console.log("test complete");
});
app.use("/api/users", usersRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/articles", articlesRouter);

app.use("/*", (req, res, next) => {
    res.status(404);
    res.send({msg: "Page not found"});
});
app.use((err, req, res, next) => {
    if(err.type === "CastError") {
        res.status(404);
        res.send({msg: "Page not found"});
    }
    else {
        res.status(500);
        res.send({msg: err});
    }
});

module.exports = app;