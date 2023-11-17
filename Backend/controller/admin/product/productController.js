const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {

  const file = req.file;
  let filePath;
  if (!file) {
    filePath =
      "https://t3.ftcdn.net/jpg/00/79/36/04/240_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg"
  } else {
    filePath = req.file.filename;
  }

  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;


  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty
  ) {
    return res.status(400).json({
      message:
        "Please provide productName,productDescription,productPrice,productStatus,productStockQty",
    });
  }
  // insert into the Product collection/table
  await Product.create({
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
    productImage:"http://localhosst:4000/" + filePath,
  });
  res.status(200).json({
    message: "Product Created Successfully",
  });
};
