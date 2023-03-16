const Join = require("joi");

const id = Join.string().uuid();
const name = Join.string().alphanum().min(3).max(15);
const price = Join.number().integer().min(3);
const image = Join.string().uri();

const createProductDto = Join.object({
  name  : name.required(),
  price : price.required(),
  image : image.required(),
});


const updateProductDto = Join.object({
  name  : name.required(),
  price : price.required()
});


const getProductDto = Join.object({
  id  : id.required(),
});

module.exports = {createProductDto, updateProductDto, getProductDto}
