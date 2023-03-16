const faker = require("faker")
const boom = require('@hapi/boom');

class ProductsService
{
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id    : faker.datatype.uuid(),
        name  : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(),10),
        image : faker.image.imageUrl(),
        isBloked : faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct
  }

  find() {
    return new Promise((resolve, reject)=> {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async update(id, changes) {
    const index = this.products.findIndex(i => i.id === id);
    if (index == -1)
    {
      throw boom.notFound("producto not found");
    }
    const product = this.products[index];
    this.products[index] = {...product, ...changes};
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(i => i.id === id);
    if (index == -1)
    {
      throw boom.notFound("producto not found");
    }
    this.products.splice(index,1);
    return {id};
  }

  async findOne(id) {
    const product = this.products.find(item => item.id == id);
    if (!product)
    {
      throw boom.notFound("producto not found");
    }
    if (product.isBloked)
    {
      throw boom.conflict("producto not found");
    }
    return product;
  }
}

module.exports = ProductsService;
