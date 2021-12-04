const route = require("express").Router();

const productController = require("../controllers/products");

route.post("/", productController.createProduct);

module.exports = route;
