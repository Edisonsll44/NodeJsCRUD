const express = require("express")
const ProductsService = require("../services/product.service");
const validatorHandler = require("../middleware/validator.handler");
const {createProductDto, updateProductDto, getProductDto} = require("../dtos/product.dto");

const router = express.Router();
const productsService = new ProductsService();

router.get("/", async (req, res) => {
  const products = await productsService.find();
  res.json(products);
});

/**end point especifico */
router.get("/filter",(req,res) => {
  res.send("Yo soy filter");
});

router.get("/:id",
            validatorHandler(getProductDto,"params"),
            async (req, res, next) => {
              try {
                const {id} = req.params;
                if (id === '999') {
                  res.status(404).json({
                    message: "Not Found"
                  });
                } else {
                  const product = await productsService.findOne(id);
                  res.json(product);
                }
              } catch (error) {
                next(error);
              }
});

router.post("/",
            validatorHandler(createProductDto, "body"),
            async (req,res) => {
                  const body = req.body;
                  const newProduct = await productsService.create(body);
                  res.status(201).json(newProduct);
});

router.patch("/:id",
            validatorHandler(getProductDto, "params"),
            validatorHandler(updateProductDto, "body"),
            async (req, res, next)=>  {
                try
                {
                  const {id} = req.params;
                  const body = req.body;
                  const productModified = await productsService.update(id, body);
                  res.json(productModified);
                } catch (error) {
                  next(error);
                }
});

router.delete("/:id",async (req, res, next) =>{
  try
  {
    const {id} = req.params;
    const productDeleted = await productsService.delete(id);
    res.json(productDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
