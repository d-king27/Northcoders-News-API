const router = require("express").Router();
const {voteCommentById,deleteComment} = require("../controllers");

router.put("/:comment_id", voteCommentById);
router.delete("/:id", deleteComment);

module.exports = router;