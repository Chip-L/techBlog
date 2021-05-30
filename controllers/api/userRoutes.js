const router = require("express").Router();
const { User } = require("../../models");

//base url: http://localhost:3001/api +

//create new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    const { message } = err;
    if (message === "Validation error") {
      res.status(400).json(err);
    }
    res.status(500).json(err);
  }
});

// Log user in
router.post("/login", async (req, res) => {
  try {
    // get the user from the db
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    // if no user found - return 400
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if found validate password
    const validPwd = await userData.checkPassword(req.body.password);

    // if password is not valid return 400 bad password
    if (!validPwd) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if valid - set up session and save as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json({
        user: userData,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
