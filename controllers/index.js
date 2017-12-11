const user = require("./user.js");
const comment = require("./comments.js");
const article = require("./articles.js");
const topic = require("./topics.js");
const exp = Object.assign({},article,user,comment,topic);
module.exports = exp;