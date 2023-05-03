const mongoose = require("mongoose");
const joi = require("joi");

const cartSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    minlength: 1,
    maxlength: 1,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

function validateCart(cart) {
  const schema = joi.object({
    productID: joi.string().required(),
    productName: joi.string().min(1).max(100).required(),
    imageURL: joi.string().required(),
    size: joi.string().min(1).max(1).required(),
    color: joi.string().required(),
    cost: joi.number().required(),
  });
  const validate = schema.validate(cart);
  return validate;
}
module.exports.cartSchema = cartSchema;
module.exports.validateCart = validateCart;
