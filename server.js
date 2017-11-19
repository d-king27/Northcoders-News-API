const express = require('express')
const app = express()
const config = require('./config');
if(!process.env.NODE_ENV){process.env.NODE_ENV = 'dev'}
const db = config.DB[process.env.NODE_ENV]
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const { Users, Comments,Topics,Articles } = require('./models/models');
const topicsRouter = require('./routes/topics.js')
const articlesRouter = require('./routes/articles.js')
const usersRouter = require('./routes/users.js')
const commentsRouter = require('./routes/comments.js')
mongoose.Promise = Promise;


mongoose.connect(db, {useMongoClient: true})
.then(() => console.log('successfully connected to', db))
.catch(err => console.log('connection failed', err));

app.use(bodyParser.json())
app.use(cors())
app.get('/api',(req,res)=>{
    res.send('listening')
    console.log('requested')
})
app.use('/api/users', usersRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/articles', articlesRouter)

module.exports = app