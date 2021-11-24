const route = require("express").Router();

const itemController = require("../controllers/items");

route.get("/", itemController.getItems);
route.post("/", itemController.createItem);
route.patch("/:id", itemController.updateItemPartially);
route.put("/:id", itemController.updateItem);
route.get("/testing", itemController.testing);

module.exports = route;
