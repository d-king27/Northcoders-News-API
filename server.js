let config = require('./config');
var db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = process.env.PORT || config.PORT[process.env.NODE_ENV || 9000] 