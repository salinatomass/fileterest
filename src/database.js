const { connect } = require("mongoose");
const { MONGODB_URL } = require("./config");

connect(MONGODB_URL)
  .then((db) => console.log(`[db:${db.connection.name}] Succesfuly connected!`))
  .catch((err) => console.error(err));
