const {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  updatePaymentStatus,
} = require("../../controller/admin/order/orderController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const permitTo = require("../../middleware/permitTo");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

router
  .route("/orders")
  .get(isAuthenticated, permitTo("admin"), catchAsync(getAllOrders));

router
  .route("/orders/paymentstatus/:id")
  .patch(isAuthenticated, permitTo("admin"), catchAsync(updatePaymentStatus));
router
  .route("/orders/:id")
  .get(isAuthenticated, permitTo("admin"), catchAsync(getSingleOrder))
  .patch(isAuthenticated, permitTo("admin"), catchAsync(updateOrderStatus))
  .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteOrder));

module.exports = router;
