const route = require("express").Router();

const productController = require("../controllers/products");

route.get("/:id", productController.getProductDetails);
route.post("/", productController.createProduct);

module.exports = route;
