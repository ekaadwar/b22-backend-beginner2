const db = require("../helpers/db");

const table = "categories";

exports.createCategory = (data, cb) => {
  db.query(`INSERT INTO ${table} (name) VALUES (?)`, [data.name], cb);
};

exports.getCategories = (cb) => {
  db.query(`SELECT name FROM ${table}`, cb);
};

exports.getProductByCategories = (id, cb) => {
  db.query(
    `
    SELECT products.name, products.price FROM products
    LEFT JOIN product_categories ON product_categories.id_product = products.id
    WHERE product_categories.id_category = ?
  `,
    [id],
    cb
  );
};
