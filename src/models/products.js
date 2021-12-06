const db = require("../helpers/db");

const table = "products";

exports.createProduct = (data, cb) => {
  db.query(
    `INSERT INTO ${table} (name, price, description, quantity, delivery_on)
        VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.price, data.description, data.quantity, data.delivery_on],
    cb
  );
};

exports.getProductDetails = (id, cb) => {
  db.query(
    `
  SELECT 
  products.id,
  products.name as name, 
  products.price as base_price,
  variants.additional_price,
  (products.price+variants.additional_price) as end_price,
  products.delivery_on,
  products.description,
  products.quantity,
  variants.name as variants_name,
  variants.code as variants_code,
  products.created_at,
  products.updated_at
  FROM products
  INNER JOIN product_variants ON product_variants.id_product = products.id
  INNER JOIN variants ON variants.id = product_variants.id_variant
  WHERE products.id = ?
  `,
    [id],
    cb
  );
};
