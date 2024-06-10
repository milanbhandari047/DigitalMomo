const axios = require("axios");
const Order = require("../../../model/orderModel");
const User = require("../../../model/userModel");

exports.initiateKhaltiPayment = async (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) {
    return res.status(400).json({
      message: "Please provide orderId, amount",
    });
  }

  let order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      message: "No order with that id",
    });
  }

  //check the coming amount is the totalAmount of order
  if (order.totalAmount !== amount) {
    return res.status(400).json({
      message: "Amount must be equal to TotalAmount",
    });
  }
  const data = {
    return_url: "http://localhost:5173/success",
    purchase_order_id: orderId,
    amount: amount * 100,
    purchase_order_name: "orderName_" + orderId,
    website_url: "http://localhost:4000/",
  };
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: " key 65556f38eece4e1bb1d0052deaea0e93",
      },
    }
  );
  order.paymentDetails.pidx = response.data.pidx;

  await order.save();
  res.status(200).json({
    message: "Payment successful",
    paymentUrl: response.data.payment_url,
  });
};

exports.verifyPidx = async (req, res) => {
  const pidx = req.body.pidx;
  const userId = req.user.id;

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: " key 65556f38eece4e1bb1d0052deaea0e93",
      },
    }
  );

  if (response.data.status == "Completed") {
    //database ma modification
    let order = await Order.find({ "paymentDetails.pidx": pidx });
    order[0].paymentDetails.method = "khalti";
    order[0].paymentDetails.status = "paid";
    await order[0].save();

    //empty user cart
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    res.status(200).json({
      message: "Payment Verified successfully",
    });
  }
};
