const { Router } = require("express");
const Image = require("../models/Image");
const { unlink } = require("fs-extra");
const path = require("path");

const router = Router();

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.render("index", { images });
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const { title, description } = req.body;
  const { filename, originalname, mimetype, size } = req.file;

  const image = new Image({
    title,
    description,
    filename,
    path: `/img/uploads/${filename}`,
    originalname,
    mimetype,
    size,
    created_at: Date.now(),
  });

  await image.save();

  res.redirect("/");
});

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render("details", { image });
});

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;

  const imageDeleted = await Image.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public/") + imageDeleted.path);
  res.redirect("/");
});

module.exports = router;
