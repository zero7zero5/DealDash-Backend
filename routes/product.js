const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const { productSchema, validateProduct } = require("../models/productModel");

const productModel = mongoose.model("product", productSchema);

route.get("/", async (req, res) => {
  const result = await productModel.find();
  res.send(result);
});

route.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const product = new productModel({
    name: req.body.name,
    imageURL: req.body.imageURL,
    cost: req.body.cost,
    type: req.body.type,
  });
  const result = await product.save();
  res.send(result);
});

module.exports = route;
