const router = require("express").Router();
const {getUserById} = require("../controllers"); 

router.get("/:username", getUserById);

module.exports = router;