const {getUserById} = require("./user.js");
const {deleteComment,voteCommentById,postComment,getCommentsByArticleId} = require("./comments.js");
const {voteArticleById,getAllArticles,getArticleByid} = require("./articles.js");
const {getAllTopics,getArticlesByTopic} = require("./topics.js");

module.exports = {voteArticleById,
    getAllArticles,
    getUserById,
    deleteComment,
    voteCommentById,
    postComment,
    getCommentsByArticleId,
    getAllTopics,
    getArticlesByTopic,
    getArticleByid
}
