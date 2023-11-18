const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  
  const file = req.file;
  let filePath;
  if (!file) {
    filePath =
      "https://t3.ftcdn.net/jpg/00/79/36/04/240_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg";
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

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    res.status(400).json({
      message: "NO Product Found",
      products: [],
    });
  } else {
    res.status(200).json({
      message: "Products Fetched Successfully",
      products,
    });
  }
};



exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id(productId",
    });
  }
  const product = await Product.find({ _id: id });
  if (product.length == 0) {
    res.status(400).json({
      message: "No product found with that id",
      product: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  }
  
};

