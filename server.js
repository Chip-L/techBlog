// bring in modules needed
const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");

// configure modules
const sequelize = require("./config/connection");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// setup server
const app = express();
const PORT = process.env.PORT || 8080;

// set up session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// set up handlebars
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// browser io middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// connect to the MySQL server and start the server
sequelize
  .sync({ force: false })
  .then(
    app.listen(PORT, () =>
      console.log(`Tech Blog is now listening to PORT: ${PORT}`)
    )
  );
