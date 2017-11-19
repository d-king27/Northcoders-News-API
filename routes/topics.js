const router = require('express').Router();
const {getAllTopics} = require('../controllers');

router.get('/',getAllTopics)
module.exports = router