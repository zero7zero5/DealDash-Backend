const mongoose = require("mongoose");
const { cartSchema } = require("./cartModel");
const joi = require("joi");
const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  cart: [cartSchema],
  orderList: [],
});

function validateUser(user) {
  const schema = joi.object({
    firstName: joi.string().min(1).max(255).required(),
    lastName: joi.string().min(1).max(255).required(),
    email: joi.string().email().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required(),
  });
  const result = schema.validate(user);
  return result;
}
module.exports.schema = schema;
module.exports.validateUser = validateUser;
