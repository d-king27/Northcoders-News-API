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


app.use(bodyParser.json())
app.use(cors())

mongoose.connect(db, {useMongoClient: true})
.then(() => console.log('successfully connected to', db))
.catch(err => console.log('connection failed', err));

module.exports = app