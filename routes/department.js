const express = require("express");
const router = express.Router();

const Department = require("../models/department");
router.post("/create", async (req, res) => {
  const title = req.body.title;
  // On checher un department dans la base de donnee qui a comme nom `title`
  const ifExist = await Department.findOne({ title: title });
  // Si on en trouve un ERROR
  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Department already exists"
      }
    });
  }

  // On genere le nouveau department
  try {
    // On cree un nouveau department avec le Model
    const newDepartment = Department({
      title: title
    });

    // On sauvegarde le nouveau department pour l'ajouter a la base de donnee
    await newDepartment.save();
    res.status(201).send(newDepartment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Route pour renomer un department
router.put("/update", async (req, res) => {
  const id = req.query.id;
  const title = req.body.title;

  try {
    // On checher un department dans la base de donnee qui a comme nom `title`
    const department = await Department.findOne({ _id: id });
    // Si on en trouve un ERROR
    department.title = title;
    await department.save();
    res.status(201).send(department);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    // On supprime le medoc qui a pour id `id`
    await Department.findByIdAndRemove(id);
    res.send("est bien supprimer");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
