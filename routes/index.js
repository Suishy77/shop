require("dotenv/config");
const express = require("express");
const router = express.Router();

router.use("/department", require("./department"));
router.use("/category", require("./category"));
router.use("/product", require("./product"));

console.log(process.env.KEY);

module.exports = router;
