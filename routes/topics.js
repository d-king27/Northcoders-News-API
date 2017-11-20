const router = require('express').Router();
const {getAllTopics, getArticlesByTopic} = require('../controllers');

router.get('/',getAllTopics)
router.get('/:id/articles',getArticlesByTopic)
module.exports = router