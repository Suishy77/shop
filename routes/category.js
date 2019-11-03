const express = require("express");
const router = express.Router();

const Category = require("../models/category");
router.post("/create", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;
  // On checher une category dans la base de donnee qui a comme nom `title`
  const ifExist = await Category.findOne({ title: title });
  // Si on en trouve un ERROR
  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Category already exists"
      }
    });
  }

  // On genere le nouveau category
  try {
    // On cree un nouveau category avec le Model

    const newCategory = Category({
      title: title,
      description: description,
      department: department
    });

    // On sauvegarde le nouveau department pour l'ajouter a la base de donnee
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categorys = await Category.find();
    res.json(categorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;

  try {
    // On checher un department dans la base de donnee qui a comme nom `title`
    const category = await Category.findOne({ _id: id });

    // Si on en trouve un ERROR
    category.title = title;
    category.description = description;
    category.department = department;
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    // On supprime le medoc qui a pour id `id`
    await Category.findByIdAndRemove(id);
    res.send(" category est bien supprimer");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
