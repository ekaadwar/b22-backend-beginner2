const route = require("express").Router();

const itemController = require("../controllers/items");

route.get("/", itemController.getItems);
route.get("/:id", itemController.detailItem);
route.post("/", itemController.createItem);
route.patch("/:id", itemController.updateItemPartially);
route.put("/:id", itemController.updateItem);
route.delete("/:id", itemController.deleteItem);
route.get("/testing", itemController.testing);

module.exports = route;
