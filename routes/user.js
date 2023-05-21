const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const routes = express.Router();
const _ = require("lodash");
const { validateCart } = require("../models/cartModel");
const { schema, validateUser } = require("../models/userModel");

const userModel = mongoose.model("User", schema);

routes.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.send(error.details[0].message).status(400);
    return;
  }
  const user = await userModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already exists");
  const salt = await bcrypt.genSalt(10);
  let userpassword = await bcrypt.hash(req.body.password, salt);
  const newuser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    orderList: [],
    cart: [],
  });

  newuser.password = userpassword;
  const result = await newuser.save();
  res.send(
    _.pick(result, ["_id", "firstName", "lastName", "orderList", "cart"])
  );
});
routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (!user) return res.status(404).send("No User found");
  res.send(
    _.pick(user, ["_id", "firstName", "lastName", "cart", "email", "orderList"])
  );
});
routes.post("/:id/cart", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("No user found");
  const { error } = validateCart(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const op = user.cart.find((item) => item.productID === req.body.productID);
  if (op) return res.status(400).send("Item already present in the cart");
  user.cart.push(req.body);
  const result = await user.save();
  res.send(req.body);
});
routes.get("/:id/cart", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (!user) return res.status(400).send("No such user found");
  res.send(user.cart);
});

routes.put("/:id/cart/:pid", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  const cart = user.cart;
  const item = cart.find((item) => item.productID === req.params.pid);
  if (!item) res.status(404).send("No such item found");
  item.size = req.body.size;
  item.color = req.body.color;
  item.cost = req.body.cost;
  item.quantity = req.body.quantity;
  const result = await user.save();
  res.send(result);
});

routes.delete("/:id/cart/:pid", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  let cart = user.cart;
  cart = cart.filter((i) => i.productID !== req.params.pid);
  user.cart = cart;
  const result = await user.save();
  res.send(result.cart);
});

routes.get("/:id/orders", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (!user) return res.status(400).send("No such items found");
  res.send(user.orderList);
});
routes.put("/:id/orders", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  user.orderList = req.body.items;
  const result = await user.save();
  res.send(result);
});
module.exports = routes;
module.exports.userModel = userModel;
