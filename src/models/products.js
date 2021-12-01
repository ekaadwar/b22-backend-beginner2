const db = require("../helpers/db");

exports.createProduct = (data, cb) => {
  db.query(
    `INSERT INTO products (name, price, description, quantity, delivery_on)
        VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.price, data.description, data.quantity, data.delivery_on],
    cb
  );
};
