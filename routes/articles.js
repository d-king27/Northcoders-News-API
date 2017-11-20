const router = require('express').Router();
const {getAllArticles,getCommentsByArticleId} = require('../controllers');

router.get('/',getAllArticles)
router.get('/:id/comments',getCommentsByArticleId)

module.exports = router