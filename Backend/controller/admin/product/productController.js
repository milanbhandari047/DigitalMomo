const Product = require("../../../model/productModel");
const fs = require("fs")

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
    productImage:process.env.BACKEND_URL + filePath,
  });
  res.status(200).json({
    message: "Product Created Successfully",
  });
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate({
    path:"reviews",
    populate:{
      path:"userId",
      select:"userName  userEmail"
    }
  })
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



// DELETE API

exports.deleteProduct =  async(req,res)=>{
  const {id} = req.params
  if(!id){
      return res.status(400).json({
          message : "Please provide id"
      })
  }
  const oldData = await Product.findById(id)
  if(!oldData){
      return res.status(404).json({
      
        message : "No data found with that id"
      })
  }

  const oldProductImage = oldData.productImage 
  const lengthToCut  = process.env.BACKEND_URL.length
  const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) 
       // REMOVE FILE FROM UPLOADS FOLDER
          fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
              if(err){
                  console.log("error deleting file",err) 
              }else{
                  console.log("file deleted successfully")
              }
          })
  await Product.findByIdAndDelete(id)
  res.status(200).json({

      message : "Product delete successfully"
  })

}



//UPDATE API
exports.editProduct = async(req, res) => {

  const { id } = req.params;
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
    !productStockQty ||
    !id
  ) {
    return res.status(400).json({
      message:
        "Please provide productName,productDescription,productPrice,productStatus,productStockQty ,id",
    });
  }

  const oldData = await Product.findById(id)
if(!oldData){
  return res.status(400).json({
    message:"No data found with that id"
  })
}
const oldProductImage = oldData.productImage
const lengthToCut = process.env.BACKEND_URL.length
const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)

  if(req.file && req.file.filename){
//REMOVE FILE FROM UPLOADS FOLDER
fs.unlink( "./uploads/" + finalFilePathAfterCut,(err)=>{
  if(err){
    console.log("error deleting file",err)
  }else{
    console.log("file deleted successfully")
  }
})
  }
  const datas = await Product.findByIdAndUpdate(id,{
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
    productImage:req.file && req.file.filename ? process.env.BACKEND_URL + req.file .filename:oldProductImage
  },{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    message:"Product updated successfully",
    datas
  })
};
