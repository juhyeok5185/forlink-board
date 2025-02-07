const express = require("express");
const boardController = require("./boardController");

const router = express.Router();

router.post("/board", boardController.save);
router.get("/board", boardController.findAllWithPagination);
router.get("/board/:id", boardController.findById);
router.delete("/board/:id", boardController.deleteById);

module.exports = router;
