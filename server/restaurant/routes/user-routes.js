var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order-controller");

const wrapAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
router.post("/", wrapAsync(orderController.create));
// router.get("/:id", wrapAsync(userController.getOne));
// router.get("/", wrapAsync(userController.getAll));
// router.delete("/", wrapAsync(userController.delete));
// router.put("/", wrapAsync(userController.update));

module.exports = router;
