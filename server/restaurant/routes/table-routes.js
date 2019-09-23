var express = require("express");
var router = express.Router();
const tableController = require("../controllers/table-controller");

const wrapAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
router.post("/", wrapAsync(tableController.create));
router.get("/:id", wrapAsync(tableController.getOne));
router.get("/", wrapAsync(tableController.getAll));
router.delete("/", wrapAsync(tableController.delete));
router.put("/", wrapAsync(tableController.update));

module.exports = router;
