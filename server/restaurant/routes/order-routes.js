var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order-controller");

const wrapAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
router.get("/pendingDishes", wrapAsync(orderController.getPendingDishes));
router.get("/pendingOrders", wrapAsync(orderController.getPendingOrders));
router.get("/:id", wrapAsync(orderController.getOne));
router.get("/", wrapAsync(orderController.getAll));
router.post("/", wrapAsync(orderController.create));
router.delete("/", wrapAsync(orderController.delete));
router.put("/dispatch", wrapAsync(orderController.dispatchProduct));
router.put("/", wrapAsync(orderController.update));

module.exports = router;
