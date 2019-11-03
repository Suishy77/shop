const express = require("express");
const router = express.Router();
const Product = require("../models/product");
router.post("/create", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  // On checher un product dans la base de donnee qui a comme nom `title`
  const ifExist = await Product.findOne({ title: title });
  // Si on en trouve un ERROR
  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Product already exists"
      }
    });
  }

  // On genere le nouveau product
  try {
    // On cree un nouveau product avec le Model
    const newProduct = Product({
      title: title,
      description: description,
      price: price,
      category: category
    });

    // On sauvegarde le nouveau product pour l'ajouter a la base de donnee
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/update", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  try {
    // On checher un department dans la base de donnee qui a comme nom `title`
    const product = await Product.findOne({ _id: id });

    // Si on en trouve un ERROR
    product.title = title;
    product.description = description;
    product.category = category;
    product.price = price;
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    // On supprime le medoc qui a pour id `id`
    await Product.findByIdAndRemove(id);
    res.send("est bien supprimer");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
