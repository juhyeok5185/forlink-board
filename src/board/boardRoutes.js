const express = require("express");
const boardController = require("./boardController");

const router = express.Router();

router.post("/save", boardController.saveBoard);
router.get("/list", boardController.findAllWithPagination);
router.get("/:id", boardController.findById);
router.delete("/:id", boardController.deleteById);

module.exports = router;
