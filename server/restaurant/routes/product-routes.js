var express = require("express");
var router = express.Router();
const productController = require("../controllers/product-controller");

const wrapAsync = fn => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};
router.post("/", wrapAsync(productController.create));
router.get("/:id", wrapAsync(productController.getOne));
router.get("/", wrapAsync(productController.getAll));
router.delete("/", wrapAsync(productController.delete));
router.put("/", wrapAsync(productController.update));

module.exports = router;
