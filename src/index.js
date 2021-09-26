const express = require("express");
const path = require("path");
const morgan = require("morgan");
const upload = require("./middlewares/multer.middleware");
const { format } = require("timeago.js");

// Initializations
const app = express();
require("./database");

// Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(upload);

// Global Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

// Routes
app.use(require("./routes/index"));

// Static files
app.use("/", express.static(path.join(__dirname, "./public")));

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
