const express = require("express");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize
  .sync({ alter: true })
  .then(
    app.listen(PORT, () =>
      console.log(`Tech Blog is now listening to PORT: ${PORT}`)
    )
  );
