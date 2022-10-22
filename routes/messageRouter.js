var express = require("express");
var router = express.Router();
const message_controller = require("../controllers/messageController");

/* GET users listing. */
router.get("/create", message_controller.message_create_get);
router.post("/create", message_controller.message_create_post);
router.post("/:id/delete", message_controller.message_delete);
module.exports = router;
