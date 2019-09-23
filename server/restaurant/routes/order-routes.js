var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order-controller");

const wrapAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
router.post("/", wrapAsync(orderController.create));
router.get("/:id", wrapAsync(orderController.getOne));
router.get("/", wrapAsync(orderController.getAll));
router.delete("/", wrapAsync(orderController.delete));
router.put("/", wrapAsync(orderController.update));

module.exports = router;