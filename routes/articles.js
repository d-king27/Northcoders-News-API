const router = require('express').Router();
const {getAllArticles,getCommentsByArticleId,postComment} = require('../controllers');

router.get('/',getAllArticles)
router.get('/:id/comments',getCommentsByArticleId)
router.post('/:id/comments',postComment)

module.exports = router