const mongoose = require("mongoose");

const department = mongoose.model("Department", {
  title: {
    type: String,
    default: ""
  }
});

module.exports = department;
