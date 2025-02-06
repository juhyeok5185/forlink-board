const express = require("express");
const boardController = require("../controller/boardController");

const router = express.Router();

router.post("/save", boardController.saveBoard);
router.get("/list", boardController.getBoardList);
router.get("/:id", boardController.getBoardById);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;
