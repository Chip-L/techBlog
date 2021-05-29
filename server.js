// bring in modules needed
const express = require("express");
const session = require("express-session");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();

// configure modules
const sequelize = require("./config/connection");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// setup server
const app = express();
const PORT = process.env.PORT || 3001;

// set up session
const sess = {
  secret: "super secret passphrase", // SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// browser io middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize
  .sync({ alter: true })
  .then(
    app.listen(PORT, () =>
      console.log(`Tech Blog is now listening to PORT: ${PORT}`)
    )
  );
