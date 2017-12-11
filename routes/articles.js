const router = require("express").Router();
const {getAllArticles,getCommentsByArticleId,postComment,voteArticleById} = require("../controllers");

router.get("/",getAllArticles);
router.get("/:id/comments",getCommentsByArticleId);
router.post("/:id/comments",postComment);
router.put("/:article_id", voteArticleById);

module.exports = router;