const mongoose = require("mongoose");
const joi = require("joi");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

function validateProduct(product) {
  const schema = joi.object({
    name: joi.string().min(1).max(255).required(),
    imageURL: joi.string().required(),
    cost: joi.number().min(1).required(),
    type: joi.string().min(5).max(255).required(),
  });
  const result = schema.validate(product);
  return result;
}
exports.productSchema = productSchema;
exports.validateProduct = validateProduct;
