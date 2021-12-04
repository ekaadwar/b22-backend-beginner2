const db = require("../helpers/db");
const table = "product_categories";

exports.createProductCategories = (data, cb) => {
  db.query(
    `INSERT INTO ${table} (id_product, id_category) VALUES (?,?)`,
    [data.id_product, data.id_category],
    cb
  );
};
