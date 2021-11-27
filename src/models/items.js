const db = require("../helpers/db");

exports.createItem = (data, cb) => {
  db.query(
    `INSERT INTO items (name, price, category_id) VALUES ('${data.name}', ${data.price}, 1)`,
    cb
  );
};

exports.getItems = (cb) => {
  db.query(`SELECT id, name, price FROM items`, cb);
};

exports.getItemById = (id, cb) => {
  db.query(`SELECT * FROM items WHERE id=${id}`, cb);
};

exports.updateItem = (data, cb) => {
  db.query(
    `UPDATE items SET name='${data.name}', price=${data.price} WHERE id=${data.id}`,
    cb
  );
};

exports.updateItemParsial = (data, cb) => {
  const key = Object.keys(data); //[id, column]
  const lastColumn = key[key.length - 1];
  // console.log(data[lastColumn]);

  db.query(
    `UPDATE items SET ${lastColumn}=?? WHERE id=?`,
    [data[lastColumn], data.id],
    cb
  );
};

exports.deleteItem = (id, cb) => {
  db.query(`DELETE FROM items WHERE id=?`, [id], cb);
};
