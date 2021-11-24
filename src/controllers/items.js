const itemModel = require("../models/items");

exports.getItems = (req, res) => {
  itemModel.getItems((error, results, _fields) => {
    if (!error) {
      return res.status(200).json({
        success: true,
        message: "List of items",
        results,
      });
    }
  });
};

exports.testing = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "testing doang gan... alright",
  });
};

exports.createItem = (reg, res) => {
  itemModel.createItem(reg.body, () => {
    return res.json({
      success: true,
      message: "Item has been created successfully",
    });
  });
};

exports.updateItemPartially = (req, res) => {
  const { id } = req.params;
  itemModel.getItemById(id, (error, results, _fields) => {
    if (!error) {
      if (results.length > 0) {
        // const { name, price } = req.body;
        // const updatedAt = new Date();
        // dataUpdate = { id, name, price, updated_at: updatedAt };
        dataUpdate = { id, name, price };

        const key = Object.keys(req.body);
        // console.log(key);

        if (key.length > 1) {
          return res.status(400).json({
            success: false,
            message: "System just need only one column!",
          });
        } else {
          const firstColumn = key[0];
          // console.log(firstColumn);
          const updateData = { id, [firstColumn]: req.body[firstColumn] };
          itemModel.updateItemParsial(updateData, (error, results, _fields) => {
            if (!error) {
              return res.status(200).json({
                success: true,
                message: "Item updated successfully!",
              });
            } else {
              console.log(error);
              return res.status(500).json({
                success: false,
                message: "An error occurred!",
              });
            }
          });
        }

        // itemModel.updateItem(dataUpdate, (error, results, _fields) => {
        //   if (!error) {
        //     return res.status(200).json({
        //       success: true,
        //       message: "Item updated successfully!",
        //     });
        //   } else {
        //     console.log(error);
        //     return res.status(500).json({
        //       success: false,
        //       message: "An error occurred!",
        //     });
        //   }
        // });

        // return res.status(200).json({
        //   success: true,
        //   message: "Item found!",
        //   results: results[0],
        // });
      } else {
        return res.status(404).json({
          success: false,
          message: "Item not found!",
        });
      }
    }
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  itemModel.getItemById(id, (error, results, _fields) => {
    if (!error) {
      if (results.length > 0) {
        const { name, price } = req.body;
        const dataUpdate = { id, name, price };
        console.log(name);
        itemModel.updateItem(dataUpdate, (error, results, _fields) => {
          if (!error) {
            return res.status(200).json({
              success: true,
              message: "data updated successfully!",
            });
          } else {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: "data updated fail!",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Data not found!",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "data not found!",
      });
    }
  });
};
