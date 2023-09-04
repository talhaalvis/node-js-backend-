const express = require("express");
const productController = require("./Routes/ProductRoutes");
const userController = require("./Routes/UserRoutes");
const errmiddleWare = require("./MiddleWare/ErrorMiddleWare");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
// Route imports

// const products = require("./Routes/ProductRoutes");
app.use("/api/v1", productController);
app.use("/api/v1", userController);
// error middleware
app.use(errmiddleWare);
module.exports = app;
