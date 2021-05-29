// bring in modules needed
const express = require("express");
const path = require("path");

// configure modules
const sequelize = require("./config/connection");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// setup server
const app = express();
const PORT = process.env.PORT || 3001;

// browser io middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize
  .sync({ force: true })
  .then(
    app.listen(PORT, () =>
      console.log(`Tech Blog is now listening to PORT: ${PORT}`)
    )
  );
