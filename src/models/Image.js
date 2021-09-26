const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  filename: { type: String },
  path: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created_at: { type: Date, default: Date.now() },
});

module.exports = model("image", imageSchema);
