const ErrorHandler = require("../Utils/ErrorHandler");
const Product = require("../Models/ProductModel");
const CatchAsyncError = require("../MiddleWare/CatchAsyncErro");
const ApiFeatures = require("../Utils/ApiFeatures");
// create product --admin
exports.createProduct = CatchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
});

// get all products
exports.getAllProducts = CatchAsyncError(async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 5;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeatures.query;
  res.status(200).json({
    message: "success",
    data: product,
    productCount,
  });
});

// get product

exports.getProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
});
// update product ---admin

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  if (!updateProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    message: "success",
    data: updateProduct,
  });
});

// product delete

exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  let product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    message: "Product successfully removed",
  });
});
