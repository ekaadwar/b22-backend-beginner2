const route = require("express").Router();

const categoryController = require("../controllers/categories");

route.get("/", categoryController.getCategories);
route.post("/", categoryController.createCategories);
route.get("/:id", categoryController.getProductByCategories);

module.exports = route;
