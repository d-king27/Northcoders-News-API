const express = require('express')
const app = express()
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const cors = require('cors')
let path = require('path');
const { Users, Comments,Topics,Articles } = require('./models/models');
const topicsRouter = require('./routes/topics.js')
const articlesRouter = require('./routes/articles.js')
const usersRouter = require('./routes/users.js')
const commentsRouter = require('./routes/comments.js')

mongoose.connect(db, {useMongoClient: true})
.then(() => console.log('successfully connected to', db))
.catch(err => console.log('connection failed', err));


app.use(bodyParser.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/articles', articlesRouter)

module.exports = app