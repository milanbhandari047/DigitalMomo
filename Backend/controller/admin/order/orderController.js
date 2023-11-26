const Order = require("../../../model/orderModel");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate({
    path: "items.product",
    model: "Product",
    select: "-productStockQty -reviews -createdAt -updatedAt -__v",
  });
  if (orders.length == 0) {
    return res.status(400).json({
      message: "No orders",
      data: [],
    });
  }
  res.status(200).json({
    message: "Order fetched Successfully",
    data: orders,
  });
};
