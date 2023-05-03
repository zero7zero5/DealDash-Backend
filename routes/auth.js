const { userModel } = require("./user");
const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const route = express.Router();

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.send(error.details[0].message).status(400);
    return;
  }
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid username or password");
  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send("Invalid username or password");
  const token = jwt.sign(
    _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "cart",
      "orderList",
      "email",
    ]),
    "privateKey"
  );
  res.send(token);
});

function validate(user) {
  const schema = joi.object({
    email: joi.string().email().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required(),
  });
  const result = schema.validate(user);
  return result;
}
module.exports = route;
