const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/uploads"),
  filename: (req, file, cb, filename) =>
    cb(null, uuid() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("image");

module.exports = upload;
