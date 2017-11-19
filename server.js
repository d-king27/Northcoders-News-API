const express = require('express')
const app = express()
let config = require('./config');
var db = config.DB[process.env.NODE_ENV] || process.env.DB;


module.exports = app